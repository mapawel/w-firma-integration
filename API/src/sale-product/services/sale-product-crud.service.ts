import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleProduct } from '../entity/Sale-product.entity';
import { SaleProductQueryParamsDTO } from '../dto/sale-product-query-params.dto';
import { SaleProductGetResponseDTO } from '../dto/sale-product-get-response.dto';
import { saleProductResDtoMapper } from '../dto/sale-product-res-dto.mapper';
import { SaleProductException } from '../exceptions/sale-product.exception';

@Injectable()
export class SaleProductCrudService {
    constructor(
        @InjectRepository(SaleProduct)
        private readonly saleProductRepository: Repository<SaleProduct>, // private readonly codeTranslationService: CodeTranslationService,
    ) {}

    public async getAllSaleProducts(
        saleProductQueryParams: SaleProductQueryParamsDTO,
    ): Promise<SaleProductGetResponseDTO> {
        try {
            console.log(
                '===================================> saleProductQueryParams > ',
                JSON.stringify(saleProductQueryParams, null, 2),
            );

            const {
                customerId,
                productCode,
                currency,
                status,
                reservationId,
                sortParam,
                sortDirect,
                records,
                skip,
            }: SaleProductQueryParamsDTO = saleProductQueryParams;

            const queryBuilder = this.saleProductRepository
                .createQueryBuilder('saleProduct')
                .leftJoinAndSelect('saleProduct.productCode', 'productCode')
                .orderBy(`saleProduct.${sortParam}`, sortDirect)
                .take(records)
                .skip(skip);

            if (customerId) {
                queryBuilder.andWhere('saleProduct.customerId = :customerId', {
                    customerId,
                });
            }
            if (currency) {
                queryBuilder.andWhere('saleProduct.currency = :currency', {
                    currency,
                });
            }
            if (status) {
                if (status !== 'all')
                    queryBuilder.andWhere('saleProduct.status = :status', {
                        status,
                    });
            }
            if (productCode) {
                if (productCode === 'null') {
                    queryBuilder.andWhere('saleProduct.productCode IS NULL');
                } else {
                    queryBuilder.andWhere('productCode.PN = :productCode', {
                        productCode,
                    });
                }
            }
            if (reservationId) {
                if (reservationId !== 'all')
                    queryBuilder.andWhere(
                        'saleProduct.reservationId = :reservationId',
                        {
                            reservationId,
                        },
                    );
            }

            const saleProducts: SaleProduct[] = await queryBuilder.getMany();
            const totalSaleProducts = await queryBuilder.getCount();
            // const [totalSaleProducts, uniqueReservations: [
            //     number,
            //     { invoice_number: string }[],
            // ] = await Promise.all([
            //     queryBuilder.getCount(),
            //     await queryBuilder
            //         .orderBy('invoice.number')
            //         .distinctOn(['invoice.number'])
            //         .select('invoice.number')
            //         .where({})
            //         .getRawMany(),
            // ]);

            // const uniqueReservationIds = uniqueReservations.map(
            //     (item: { invoice_number: string }) => item.invoice_number,
            // );

            return {
                saleProducts: saleProducts.map((product: SaleProduct) =>
                    saleProductResDtoMapper(product),
                ),
                totalSaleProducts,
                uniqueReservationIds: ['a', 'bb'],
            };
        } catch (err) {
            throw new SaleProductException(
                `Error while getting products. Query: ${JSON.stringify(
                    saleProductQueryParams,
                    null,
                    2,
                )}`,
                {
                    cause: err,
                },
            );
        }
    }

    // public async deleteProducts(
    //     productIds: number[],
    // ): Promise<ProductPatchOrDeleteResDTO> {
    //     try {
    //         await this.validateToDelete(productIds);
    //         const { affected }: { affected?: number | null | undefined } =
    //             await this.productRepository.delete(productIds);
    //
    //         if (affected !== productIds.length)
    //             throw new NotFoundException(
    //                 `Deleted products: ${affected}. Not found: ${
    //                     productIds.length - (affected || 0)
    //                 }.`,
    //             );
    //
    //         return {
    //             info: `Deleted all required products.`,
    //         };
    //     } catch (err) {
    //         if (err instanceof NotFoundException) throw err;
    //         throw new ProductException(
    //             `Error while deleting products. Product ids: ${productIds}.`,
    //             {
    //                 cause: err,
    //             },
    //         );
    //     }
    // }
    //
    // public async updateProductCode(
    //     patchData: ProductPatchDTO,
    //     userId: string,
    // ): Promise<ProductPatchOrDeleteResDTO> {
    //     try {
    //         const { productId, productCode }: ProductPatchDTO = patchData;
    //
    //         const product: Product | null =
    //             await this.productRepository.findOne({
    //                 where: {
    //                     id: productId,
    //                     productCode: IsNull(),
    //                 },
    //             });
    //
    //         if (!product)
    //             throw new NotFoundException(
    //                 `Product not found or productCode for this product is already set.`,
    //             );
    //
    //         const addedCodeTranslation: CodeTranslation[] =
    //             await this.codeTranslationService.createOrUpdateCodeTranslations(
    //                 [
    //                     {
    //                         supplier: product.supplier,
    //                         supplierCode: product.supplierCode,
    //                         PN: productCode,
    //                     },
    //                 ],
    //                 userId,
    //             );
    //
    //         const { affected }: { affected?: number | null | undefined } =
    //             await this.productRepository.update(
    //                 { id: productId },
    //                 {
    //                     productCode: addedCodeTranslation[0],
    //                     updatedBy: userId,
    //                     updatedAt: new Date(),
    //                     status: Status.NEW,
    //                 },
    //             );
    //
    //         if (affected !== 1)
    //             throw new Error(
    //                 `Nie można dodać tłumaczenia kodu produktu o kodzie dostawcy: ${product.supplierCode}.`,
    //             );
    //
    //         await this.patchSameProductSupplierNames(
    //             product.supplierCode,
    //             addedCodeTranslation[0],
    //             userId,
    //         );
    //
    //         return {
    //             info: `Tłumaczenie kodu dostawcy ${product.supplierCode} na kod produktu ${productCode} zostało dodane. Dopisano je do WSZYSTKICH produktów o kodzie dostawcy: ${product.supplierCode}.`,
    //         };
    //     } catch (err) {
    //         if (err instanceof NotFoundException) throw err;
    //         throw new ProductException(
    //             `Error while updating product code. Product id: ${patchData.productId}.`,
    //             {
    //                 cause: err,
    //             },
    //         );
    //     }
    // }

    // private async patchSameProductSupplierNames(
    //     supplierCode: string,
    //     codeTranslation: CodeTranslation,
    //     userId: string,
    // ): Promise<true> {
    //     try {
    //         let successCount = 0;
    //         const productsToPatch: Product[] =
    //             await this.productRepository.find({
    //                 where: {
    //                     supplierCode,
    //                     productCode: IsNull(),
    //                     status: Status.NEW_WARN,
    //                 },
    //             });
    //
    //         for (const product of productsToPatch) {
    //             const { affected }: { affected?: number | null | undefined } =
    //                 await this.productRepository.update(
    //                     { id: product.id },
    //                     {
    //                         productCode: codeTranslation,
    //                         updatedBy: userId,
    //                         updatedAt: new Date(),
    //                         status: Status.NEW,
    //                     },
    //                 );
    //             if (affected !== 1)
    //                 throw new Error(
    //                     'Error while patching product with the same supplier names as currently patched product.',
    //                 );
    //             successCount++;
    //         }
    //         if (successCount !== productsToPatch.length)
    //             throw new Error('Not all products were patched ! ! !');
    //         return true;
    //     } catch (err) {
    //         throw new ProductException(
    //             `Error while patching product with the same supplier names as currently patched product. Supplier code: ${supplierCode}.`,
    //             {
    //                 cause: err,
    //             },
    //         );
    //     }
    // }

    // private async validateToDelete(productIds: number[]): Promise<void> {
    //     try {
    //         const products: Product[] = await this.productRepository.find({
    //             where: {
    //                 id: In(productIds),
    //                 status: Status.SUCCESS,
    //             },
    //         });
    //
    //         if (products.length) {
    //             throw new ProductException(
    //                 `Error while validating products to delete. Al least one product tried to delete is with status SUCCESS, not allowed to delete. Product ids: ${productIds}.`,
    //             );
    //         }
    //     } catch (err) {
    //         throw new ProductException(
    //             `Error while validating products to delete. Product ids: ${productIds}.`,
    //             {
    //                 cause: err,
    //             },
    //         );
    //     }
    // }
}
