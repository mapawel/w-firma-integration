import axios from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SystemProductResDTO } from '../../../../integrations/create-order/dto/system-product-res.dto';
import { FromSystemProductsResDTO } from '../dto/from-system-products-res.dto';
import { CreateOrderBaseClass } from '../../../../integrations/create-order/interface/create-order.base-class';
import { findAllGoodsPayload } from '../api-payloads/find-all-goods.payload';
import { mapToSystemProductResDto } from '../dto/system-product.mapper';
import { Product } from '../../../../product/entity/Product.entity';
import { temporaryAbContractorId } from 'data/ab.data';

@Injectable()
export class CreateOrderService extends CreateOrderBaseClass {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {
        super();
    }

    public async refreshProductsFromSystem(): Promise<boolean> {
        this.updateSystemProductsMap(await this.getCurrentSystemProducts());
        return true;
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
                        data: findAllGoodsPayload,
                        headers: {
                            accessKey: this.configService.get('ACCESS_KEY', ''),
                            secretKey: this.configService.get('SECRET_KEY', ''),
                            appKey: this.configService.get('APP_KEY', ''),
                        },
                    },
                );

            return mapToSystemProductResDto(data);
        } catch (err) {
            throw new Error('problem with downloading products from w-firma', {
                cause: err,
            });
        }
    }

    public async createSystemOrder(productsIds: number[]): Promise<boolean> {
        const productErrors: string[] = [];

        const productsToOrder: Product[] = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.invoice', 'invoice')
            .leftJoinAndSelect('product.productCode', 'productCode')
            .where('product.id IN (:...productsIds)', { productsIds })
            .orderBy('invoice.number', 'ASC')
            .getMany();

        for (const product of productsToOrder) {
            const productError: string | null = this.checkIfErrors(product);
            if (productError) productErrors.push(productError);
        }

        if (productErrors.length > 0)
            throw new BadRequestException(productErrors);

        await this.splitUploadOrdersToSystem(productsToOrder);

        return false;
    }

    private checkIfErrors(product: Product): null | string {
        if (!product.productCode)
            return `Dla produktu ${product.supplierCode} nie ma tłumaczenia kodu na PN, który byłby do wyszukania w W-Firma`;

        const systemProduct: string | undefined = this.systemProductsMap.get(
            product.productCode.PN,
        );

        if (!systemProduct)
            return `Dla produktu ${product.supplierCode}, tłumaczenie na PN: ${product.productCode.PN} nie można odszukać produktu w W-Firma. Jeśli dodałeś go niedawno, spróbuj odświeżyć stronę.`;

        return null;
    }

    private async splitUploadOrdersToSystem(
        products: Product[],
    ): Promise<boolean> {
        let currentInvoiceNumber: string | null = null;
        const currentInvoiceProducts: Product[] = [];

        for (const product of products) {
            if (currentInvoiceNumber === null) {
                currentInvoiceNumber = product.invoice.number;
            } else if (currentInvoiceNumber !== product.invoice.number) {
                await this.uploadOrderToSystem(currentInvoiceProducts);
                currentInvoiceProducts.length = 0;
                currentInvoiceNumber = product.invoice.number;
            }

            currentInvoiceProducts.push(product);
        }

        await this.uploadOrderToSystem(currentInvoiceProducts);

        return true;
    }

    private async uploadOrderToSystem(products: Product[]): Promise<boolean> {
        try {
            const formatDate = (currentDate: Date): string => {
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(
                    2,
                    '0',
                );
                const day = String(currentDate.getDate()).padStart(2, '0');

                return `${year}-${month}-${day}`;
            };

            const buildRequestData = (products: Product[]) => `
            {
                "api": {
                    "warehouse_documents": {
                        "0": {
                            "warehouse_document": {
                                "date": "${formatDate(new Date())}",
                                "currency": "${products[0].currency}",
                                "contractor": {
                                    "id": ${temporaryAbContractorId}
                                },
                                "description": "${products[0].invoice.number}",
                                "warehouse_document_contents": {
                                    "0": {
                                        "warehouse_document_content": {
                                            "name": "${
                                                products[0].productCode?.PN
                                            } / ${products[0].supplierCode}",
                                            "unit_count": ${
                                                products[0].quantity
                                            },
                                            "price": ${products[0].netPrice},
                                            "good": {
                                                "id": ${this.systemProductsMap.get(
                                                    products[0].productCode
                                                        ?.PN as string,
                                                )}
                                            },
                                            "unit": "szt."
                                        }
                                    },
                                    "1": {
                                        "warehouse_document_content": {
                                            "name": "b",
                                            "unit_count": ${
                                                products[0].quantity
                                            },
                                            "price": ${products[0].netPrice},
                                            "good": {
                                                "id": ${this.systemProductsMap.get(
                                                    products[0].productCode
                                                        ?.PN as string,
                                                )}
                                            },
                                            "unit": "szt."
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            `;

            const { data } = await axios.post(
                `${this.configService.get(
                    'W_FIRMA_API_URL',
                )}${this.configService.get(
                    'W_FIRMA_CREATE_ORDER_URL',
                )}${this.configService.get('W_FIRMA_COMPANY_ID')}`,
                buildRequestData(products),
                {
                    headers: {
                        accessKey: this.configService.get('ACCESS_KEY', ''),
                        secretKey: this.configService.get('SECRET_KEY', ''),
                        appKey: this.configService.get('APP_KEY', ''),
                    },
                },
            );

            console.log('data ----> ', data);

            return true;
        } catch (err) {
            console.log('err ----> ', JSON.stringify(err, null, 2));
            throw new Error('problem with uploading order to w-firma', {
                cause: err,
            });
        }
    }
}
