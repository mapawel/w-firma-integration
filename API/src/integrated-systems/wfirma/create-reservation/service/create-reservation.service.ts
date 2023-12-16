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
import { mapToSystemProductResDto } from '../dto/system-product.mapper';
import { CreateReservationResDto } from '../dto/create-reservation-res.dto';
import { Status } from '../../../../product/status/status.enum';
import { CreateReservationException } from '../../../../integrations/create-reservation/exceptions/create-reservation.exception';
import { CreateReservationBaseClass } from '../../../../integrations/create-reservation/interface/create-reservation.base-class';
import { SaleProduct } from '../../../../sale-product/entity/Sale-product.entity';
import { CreateOrderException } from '../../../../integrations/create-order/exceptions/create-order.exception';
import { FromSystemReservationCreateResDto } from '../dto/from-system-reservation-create-res.dto';

@Injectable()
export class CreateReservationService extends CreateReservationBaseClass {
    private currentContractorNumber: string | null = null;
    private currentCurrency: string | null = null;
    private currentContractorProducts: SaleProduct[] = [];
    private uploadContractorStatus: string[] = [];

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(SaleProduct)
        private readonly saleProductRepository: Repository<SaleProduct>,
    ) {
        super();
    }

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
            throw new CreateReservationException(
                'problem with downloading products from w-firma',
                {
                    cause: err,
                },
            );
        }
    }

    public async createSystemReservation(
        productsIds: number[],
    ): Promise<CreateReservationResDto> {
        try {
            this.resetClassFields();

            const productErrors: string[] = [];

            const productsToReserve: SaleProduct[] =
                await this.saleProductRepository
                    .createQueryBuilder('product')
                    .leftJoinAndSelect('product.productCode', 'productCode')
                    .where('product.id IN (:...productsIds)', { productsIds })
                    .orderBy({
                        'product.customerId': 'ASC',
                        'product.currency': 'ASC',
                    })
                    .getMany();

            if (!productsToReserve.length)
                throw new NotFoundException(
                    'No passed products found in DB to generate reservation with them!',
                );

            for (const product of productsToReserve) {
                const productError: string | null = this.checkIfErrors(product);
                if (productError) productErrors.push(productError);
            }

            if (productErrors.length > 0)
                throw new BadRequestException([
                    'Produkty są dodane do bazy, aby móc dodać je do zamówienia, ale nie udało się na wszystkie z nich stworzyć zamówienia w W-Firmie. Sprawdź to w tabeli z produktami!',
                    ...productErrors,
                ]);

            const createReservationsInfo: string[] =
                await this.splitReservationsToSystem(productsToReserve);

            return {
                info: createReservationsInfo,
            };
        } catch (err) {
            if (err instanceof RequestTimeoutException) throw err;
            if (err instanceof BadRequestException) throw err;
            if (err instanceof NotFoundException) throw err;
            throw new CreateReservationException(
                `problem with creating order in w-firma, product ids: ${productsIds}`,
                {
                    cause: err,
                },
            );
        }
    }

    private checkIfErrors(product: SaleProduct): null | string {
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
            throw new CreateReservationException(
                'problem with checking product errors',
                {
                    cause: err,
                },
            );
        }
    }

    private async splitReservationsToSystem(
        products: SaleProduct[],
    ): Promise<string[]> {
        try {
            for (const product of products) {
                if (
                    this.currentContractorNumber === null &&
                    this.currentCurrency === null
                ) {
                    this.currentContractorNumber = product.customerId;
                    this.currentCurrency = product.currency;
                } else if (
                    this.currentContractorNumber !== product.customerId ||
                    this.currentCurrency !== product.currency
                ) {
                    await this.uploadContractorProductsAndResetArr(
                        this.currentContractorProducts,
                    );
                    this.currentContractorNumber = product.customerId;
                    this.currentCurrency = product.currency;
                }

                this.currentContractorProducts.push(product);
            }

            await this.uploadContractorProductsAndResetArr(
                this.currentContractorProducts,
            );

            return this.uploadContractorStatus;
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

    private async uploadContractorProductsAndResetArr(
        products: SaleProduct[],
    ): Promise<void> {
        try {
            const reservationFeedback: string =
                await this.uploadOneReservationToSystem(products);
            this.uploadContractorStatus.push(reservationFeedback);
            this.currentContractorProducts.length = 0;
        } catch (err) {
            if (err instanceof RequestTimeoutException) throw err;
            throw new CreateReservationException(
                'problem with uploading one invoice products',
                {
                    cause: err,
                },
            );
        }
    }

    private async uploadOneReservationToSystem(
        products: SaleProduct[],
    ): Promise<string> {
        try {
            const { data }: { data: FromSystemReservationCreateResDto } =
                await axios.post(
                    `${this.configService.get(
                        'W_FIRMA_API_URL',
                    )}${this.configService.get(
                        'W_FIRMA_CREATE_RESERVATION_URL',
                    )}${this.configService.get('W_FIRMA_COMPANY_ID')}`,
                    this.buildRequestData(products),
                    {
                        timeout: 60000,
                        headers: {
                            accessKey: this.configService.get('ACCESS_KEY', ''),
                            secretKey: this.configService.get('SECRET_KEY', ''),
                            appKey: this.configService.get('APP_KEY', ''),
                        },
                    },
                );

            const currentReservationNumber: string =
                data?.warehouse_documents?.[0]?.warehouse_document
                    ?.fullnumber || 'unknown';

            if (data?.status?.code === 'OK') {
                await this.saleProductRepository.update(
                    {
                        id: In(
                            products.map((product: SaleProduct) => product.id),
                        ),
                    },
                    {
                        status: Status.SUCCESS,
                        reservationId: currentReservationNumber,
                    },
                );

                return `Sukces dla klienta nr: ${
                    products[0].customerId
                }. Numer rezerwacji: ${currentReservationNumber}. Ilość produktów: ${
                    products.length
                }. Wartość netto rezerwacji: ${this.calcTotalAndFix(
                    products,
                )} ${products[0].currency}`;
            } else {
                await this.saleProductRepository.update(
                    {
                        id: In(
                            products.map((product: SaleProduct) => product.id),
                        ),
                    },
                    { status: Status.ERROR },
                );

                return `Błąd -> ${data?.status?.code}`;
            }
        } catch (err) {
            await this.saleProductRepository.update(
                {
                    id: In(products.map((product: SaleProduct) => product.id)),
                },
                { status: Status.ERROR },
            );

            if (err?.code === 'ECONNRESET')
                throw new RequestTimeoutException(
                    'Aplikacja nie otrzymała odpowiedzi od W-Firma w żądanym czasie, ale nie oznacza to, że rezerwacja nie została stworzona. Sprawdź to najpierw w W-Firma, jeśli rezerwacje zostały stworzone, obsłuż niepoprawnie wyświetlany status dla załadowanych produktów',
                );

            throw new CreateReservationException(
                `Problem with uploading reserwation to W-Firma...: `,
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

    private buildRequestData(products: SaleProduct[]): string {
        console.log(
            '===================================>!!!!!!!!!!!!!!!!!!! products > ',
            products,
        );

        return `
        {
            "api": {
                "warehouse_documents": {
                    "0": {
                        "warehouse_document": {
                            "date": "${this.formatDate(new Date())}",
                            "currency": "${products[0].currency}",
                            "contractor": {
                                "id": ${products[0].customerId}
                            },
                            "price_type": "netto",
                            "status": "pending",
                            "warehouse_document_contents": {
                                ${products.map(
                                    (product: SaleProduct, index: number) => `
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

    private calcTotalAndFix(products: SaleProduct[]): string {
        return products
            .reduce(
                (acc: number, curr: SaleProduct) =>
                    acc + curr.netPrice * curr.quantity,
                0,
            )
            .toFixed(2);
    }

    private resetClassFields(): void {
        this.currentContractorNumber = null;
        this.currentCurrency = null;
        this.currentContractorProducts.length = 0;
        this.uploadContractorStatus.length = 0;
    }
}
