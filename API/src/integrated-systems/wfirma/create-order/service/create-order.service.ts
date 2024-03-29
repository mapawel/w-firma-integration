import axios from 'axios';
import {
    BadRequestException,
    Injectable,
    NotFoundException,
    RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SystemProductResDTO } from '../../../../integrations/create-order/dto/system-product-res.dto';
import { FromSystemProductsResDTO } from '../dto/from-system-products-res.dto';
import { CreateOrderBaseClass } from '../../../../integrations/create-order/interface/create-order.base-class';
import { mapToSystemProductResDto } from '../dto/system-product.mapper';
import { Product } from '../../../../product/entity/Product.entity';
import { CreateOrderResDTO } from '../dto/create-order-res.dto';
import { Status } from '../../../../product/status/status.enum';
import { CreateOrderException } from '../../../../integrations/create-order/exceptions/create-order.exception';

@Injectable()
export class CreateOrderService extends CreateOrderBaseClass {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {
        super();
    }
    private currentInvoiceNumber: string | null = null;
    private currentInvoiceProducts: Product[] = [];
    private uploadInvoiceStatus: string[] = [];

    public async refreshProductsFromSystem(): Promise<boolean> {
        try {
            this.updateSystemProductsMap(await this.getCurrentSystemProducts());
            return true;
        } catch (err) {
            throw new Error('problem with refreshing products from w-firma', {
                cause: err,
            });
        }
    }

    public async getCurrentSystemProducts(): Promise<SystemProductResDTO[]> {
        try {
            const { data }: { data: FromSystemProductsResDTO } =
                await axios.get(
                    `${this.configService.get(
                        'W_FIRMA_API_URL',
                    )}${this.configService.get(
                        'W_FIRMA_FIND_GOODS_URL',
                    )}${this.configService.get('W_FIRMA_COMPANY_ID')}`,
                    {
                        data: this.buildRequestGetProducts(),
                        headers: {
                            accessKey: this.configService.get('ACCESS_KEY', ''),
                            secretKey: this.configService.get('SECRET_KEY', ''),
                            appKey: this.configService.get('APP_KEY', ''),
                        },
                    },
                );
            //TODO validation of data status if not OK (check with w-firma docs)
            return mapToSystemProductResDto(data);
        } catch (err) {
            throw new CreateOrderException(
                'problem with downloading products from w-firma',
                {
                    cause: err,
                },
            );
        }
    }

    public async createSystemOrder(
        productsIds: number[],
    ): Promise<CreateOrderResDTO> {
        try {
            const productErrors: string[] = [];

            this.resetClassFields();

            const productsToOrder: Product[] = await this.productRepository
                .createQueryBuilder('product')
                .leftJoinAndSelect('product.invoice', 'invoice')
                .leftJoinAndSelect('product.productCode', 'productCode')
                .where('product.id IN (:...productsIds)', { productsIds })
                .orderBy('invoice.number', 'ASC')
                .getMany();

            if (!productsToOrder.length)
                throw new NotFoundException(
                    'No passed products found in DB to generate orders with them!',
                );

            for (const product of productsToOrder) {
                const productError: string | null = this.checkIfErrors(product);
                if (productError) productErrors.push(productError);
            }

            if (productErrors.length > 0)
                throw new BadRequestException([
                    'Produkty są dodane do bazy, aby móc dodać je do zamówienia, ale nie udało się na wszystkie z nich stworzyć zamówienia w W-Firmie. Sprawdź to w tabeli z produktami!',
                    ...productErrors,
                ]);

            const createOrdersInfo: string[] =
                await this.splitUploadOrdersToSystem(productsToOrder);

            return {
                info: createOrdersInfo,
            };
        } catch (err) {
            if (err instanceof RequestTimeoutException) throw err;
            if (err instanceof BadRequestException) throw err;
            if (err instanceof NotFoundException) throw err;
            throw new CreateOrderException(
                `problem with creating order in w-firma, product ids: ${productsIds}`,
                {
                    cause: err,
                },
            );
        }
    }

    private checkIfErrors(product: Product): null | string {
        try {
            if (!product.productCode)
                return `Dla produktu ${product.supplierCode} nie ma tłumaczenia kodu na PN.`;

            const systemProduct: string | undefined =
                this.systemProductsMap.get(product.productCode.PN);

            if (!systemProduct)
                return `Dla produktu ${product.supplierCode}, PN: ${product.productCode.PN} nie można odszukać id produktu w W-Firma. Jeśli dodałeś produkt w W-firma niedawno, spróbuj odświeżyć stronę.`;

            if (![Status.NEW, Status.ERROR].includes(product.status))
                return `Status produkt ${product.supplierCode} uniemożliwia dodanie go do zamówienia.`;

            return null;
        } catch (err) {
            throw new CreateOrderException(
                'problem with checking product errors',
                {
                    cause: err,
                },
            );
        }
    }

    private async splitUploadOrdersToSystem(
        products: Product[],
    ): Promise<string[]> {
        try {
            for (const product of products) {
                if (this.currentInvoiceNumber === null) {
                    this.currentInvoiceNumber = product.invoice.number;
                } else if (
                    this.currentInvoiceNumber !== product.invoice.number
                ) {
                    await this.uploadInvoiceProductsAndResetArr(
                        this.currentInvoiceProducts,
                    );
                    this.currentInvoiceNumber = product.invoice.number;
                }

                this.currentInvoiceProducts.push(product);
            }

            await this.uploadInvoiceProductsAndResetArr(
                this.currentInvoiceProducts,
            );

            return this.uploadInvoiceStatus;
        } catch (err) {
            if (err instanceof RequestTimeoutException) throw err;
            throw new CreateOrderException(
                'Problem with uploading orders to W-Firma while splitting them to invoices',
                {
                    cause: err,
                },
            );
        }
    }

    private async uploadInvoiceProductsAndResetArr(
        currentInvoiceProducts: Product[],
    ): Promise<void> {
        try {
            const invoiceFeedback: string =
                await this.uploadOneInvoiceOrderToSystem(
                    currentInvoiceProducts,
                );
            this.uploadInvoiceStatus.push(invoiceFeedback);
            currentInvoiceProducts.length = 0;
        } catch (err) {
            if (err instanceof RequestTimeoutException) throw err;
            throw new CreateOrderException(
                'problem with uploading one invoice products',
                {
                    cause: err,
                },
            );
        }
    }

    private async uploadOneInvoiceOrderToSystem(
        products: Product[],
    ): Promise<string> {
        try {
            const { data } = await axios.post(
                `${this.configService.get(
                    'W_FIRMA_API_URL',
                )}${this.configService.get(
                    'W_FIRMA_CREATE_ORDER_URL',
                )}${this.configService.get('W_FIRMA_COMPANY_ID')}`,
                this.buildRequestData(products),
                {
                    timeout: 30000,
                    headers: {
                        accessKey: this.configService.get('ACCESS_KEY', ''),
                        secretKey: this.configService.get('SECRET_KEY', ''),
                        appKey: this.configService.get('APP_KEY', ''),
                    },
                },
            );

            if (data?.status?.code === 'OK') {
                await this.productRepository.update(
                    {
                        id: In(products.map((product: Product) => product.id)),
                    },
                    { status: Status.SUCCESS },
                );

                return `Sukces dla faktury: ${
                    products[0].invoice.number
                }. Ilość produktów na zamówieniu: ${
                    products.length
                }. Wartość netto faktury: ${this.calcTotalAndFix(products)} ${
                    products[0].currency
                }`;
            } else {
                await this.productRepository.update(
                    {
                        id: In(products.map((product: Product) => product.id)),
                    },
                    { status: Status.ERROR },
                );

                return `Błąd dla faktury: ${products[0].invoice.number} -> ${data?.status?.code}`;
            }
        } catch (err) {
            await this.productRepository.update(
                {
                    id: In(products.map((product: Product) => product.id)),
                },
                { status: Status.ERROR },
            );

            if (err?.code === 'ECONNRESET')
                throw new RequestTimeoutException(
                    'Aplikacja nie otrzymała odpowiedzi od W-Firma w żądanym czasie, ale nie oznacza to, że zamówienia dla podanych faktur nie zostały stworzone. Sprawdź to najpierw w W-Firma, jeśli zamówienia zostały stworzone, obsłuż niepoprawnie wyświetlany status dla załadowanych produktów',
                );

            throw new CreateOrderException(
                `Problem with uploading order to W-Firma for invocie...: ${products[0].invoice.number}`,
                {
                    cause: err,
                },
            );
        }
    }

    private formatDate(currentDate: Date): string {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    private buildRequestGetProducts(): string {
        return `
            {
                "api": {
                "goods": {
                    "parameters": {
                    "page": 1,
                    "limit": 10000,
                    "fields": {
                        "field": "id",
                        "field": "code"
                    }
                    }
                }
                }
            }`;
    }

    private buildRequestData(products: Product[]): string {
        return `
        {
            "api": {
                "warehouse_documents": {
                    "0": {
                        "warehouse_document": {
                            "date": "${this.formatDate(new Date())}",
                            "currency": "${products[0].currency}",
                            "contractor": {
                                "id": ${this.configService.get(
                                    'TEMPORARY_AB_CONTRACOTR_ID',
                                    '',
                                )}
                            },
                            "description": "${products[0].invoice.number}",
                            "warehouse_document_contents": {

                                ${products.map(
                                    (product: Product, index: number) => `
                                "${index}": {
                                    "warehouse_document_content": {
                                        "name": "${product.productCode?.PN} / ${
                                        product.supplierCode
                                    }",
                                        "unit_count": ${product.quantity},
                                        "price": ${product.netPrice},
                                        "good": {
                                            "id": ${this.systemProductsMap.get(
                                                product.productCode
                                                    ?.PN as string,
                                            )}
                                        },
                                        "unit": "szt."
                                    }
                                }
                                `,
                                )}
                            }
                        }
                    }
                }
            }
        }
        `;
    }

    private calcTotalAndFix(products: Product[]): string {
        return products
            .reduce(
                (acc: number, curr: Product) =>
                    acc + curr.netPrice * curr.quantity,
                0,
            )
            .toFixed(2);
    }

    private resetClassFields(): void {
        this.currentInvoiceNumber = null;
        this.currentInvoiceProducts.length = 0;
        this.uploadInvoiceStatus.length = 0;
    }
}
