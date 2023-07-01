import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Code, In, IsNull, Repository } from 'typeorm';
import { Product } from '../entity/Product.entity';
import { productResDtoMapper } from '../dto/product-res-dto.mapper';
import { ProductQueryParamsDTO } from '../dto/product-query-params.dto';
import { ProductException } from '../exceptions/product.exception';
import { CompleteResponseDTO } from '../dto/complete-response.dto';
import { Status } from '../status/status.enum';
import { ProductDeleteResDTO } from '../dto/product-delete-res.dto';
import { ProductPatchDTO } from '../dto/product-patch.dto';
import { CodeTranslation } from 'src/code-translation/entity/Code-translation.entity';
import { CodeTranslationService } from 'src/code-translation/service/code-translation.service';

@Injectable()
export class ProductFetchAndDeleteAndPatchService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly codeTranslationService: CodeTranslationService,
    ) {}

    public async getAllProducts(
        productQueryParams: ProductQueryParamsDTO,
    ): Promise<CompleteResponseDTO> {
        try {
            const {
                supplierCode,
                productCode,
                currency,
                supplier,
                status,
                invoice,
                sortParam,
                sortDirect,
                records,
                skip,
            }: ProductQueryParamsDTO = productQueryParams;

            const queryBuilder = this.productRepository
                .createQueryBuilder('product')
                .leftJoinAndSelect('product.productCode', 'productCode')
                .leftJoinAndSelect('product.invoice', 'invoice')
                .orderBy(`product.${sortParam}`, sortDirect)
                .take(records)
                .skip(skip);

            if (supplierCode) {
                queryBuilder.andWhere('product.supplierCode = :supplierCode', {
                    supplierCode,
                });
            }
            if (currency) {
                queryBuilder.andWhere('product.currency = :currency', {
                    currency,
                });
            }
            if (supplier) {
                queryBuilder.andWhere('product.supplier = :supplier', {
                    supplier,
                });
            }
            if (status) {
                if (status !== 'all')
                    queryBuilder.andWhere('product.status = :status', {
                        status,
                    });
            }
            if (productCode) {
                if (productCode === 'null') {
                    queryBuilder.andWhere('product.productCode IS NULL');
                } else {
                    queryBuilder.andWhere('productCode.PN = :productCode', {
                        productCode,
                    });
                }
            }
            if (invoice) {
                if (invoice !== 'all')
                    queryBuilder.andWhere('invoice.number = :invoiceNumber', {
                        invoiceNumber: invoice,
                    });
            }

            const products: Product[] = await queryBuilder.getMany();
            const [totalProducts, uniqueInvoices]: [
                number,
                { invoice_number: string }[],
            ] = await Promise.all([
                queryBuilder.getCount(),
                await queryBuilder
                    .orderBy('invoice.number')
                    .distinctOn(['invoice.number'])
                    .select('invoice.number')
                    .where({})
                    .getRawMany(),
            ]);

            const uniqueInvoiceNumbers = uniqueInvoices.map(
                (item: { invoice_number: string }) => item.invoice_number,
            );

            return {
                products: products.map((product: Product) =>
                    productResDtoMapper(product),
                ),
                totalProducts,
                uniqueInvoiceNumbers,
            };
        } catch (err) {
            throw new ProductException(
                `Error while getting products. Query: ${JSON.stringify(
                    productQueryParams,
                    null,
                    2,
                )}`,
                {
                    cause: err,
                },
            );
        }
    }

    public async deleteProducts(
        productIds: number[],
    ): Promise<ProductDeleteResDTO> {
        try {
            await this.validateToDelete(productIds);
            const { affected }: { affected?: number | null | undefined } =
                await this.productRepository.delete(productIds);

            if (affected !== productIds.length)
                throw new NotFoundException(
                    `Deleted products: ${affected}. Not found: ${
                        productIds.length - (affected || 0)
                    }.`,
                );

            return {
                info: `Deleted all required products.`,
            };
        } catch (err) {
            if (err instanceof NotFoundException) throw err;
            throw new ProductException(
                `Error while deleting products. Product ids: ${productIds}.`,
                {
                    cause: err,
                },
            );
        }
    }

    public async updateProductCode(
        patchData: ProductPatchDTO,
        userId: string,
    ): Promise<string> {
        try {
            const { productId, productCode }: ProductPatchDTO = patchData;

            const product: Product | null =
                await this.productRepository.findOne({
                    where: {
                        id: productId,
                        productCode: IsNull(),
                    },
                });

            if (!product)
                throw new NotFoundException(
                    `Product not found or productCode for this product is already set.`,
                );

            const addedCodeTranslation: CodeTranslation[] =
                await this.codeTranslationService.createOrUpdateCodeTranslations(
                    [
                        {
                            supplier: product.supplier,
                            supplierCode: product.supplierCode,
                            PN: productCode,
                        },
                    ],
                    userId,
                );

            const { affected }: { affected?: number | null | undefined } =
                await this.productRepository.update(
                    { id: productId },
                    {
                        productCode: addedCodeTranslation[0],
                        updatedBy: userId,
                        updatedAt: new Date(),
                        status: Status.NEW,
                    },
                );

            if (affected !== 1)
                throw new Error(
                    `Nie można dodać tłumaczenia kodu produktu o kodzie dostawcy: ${product.supplierCode}.`,
                );

            await this.patchSameProductSupplierNames(
                product.supplierCode,
                addedCodeTranslation[0],
                userId,
            );

            return `Tłumaczenie kodu dostawcy ${product.supplierCode} na kod produktu ${productCode} zostało dodane. Dopisano je do WSZYSTKICH produktów o kodzie dostawcy: ${product.supplierCode}.`;
        } catch (err) {
            if (err instanceof NotFoundException) throw err;
            throw new ProductException(
                `Error while updating product code. Product id: ${patchData.productId}.`,
                {
                    cause: err,
                },
            );
        }
    }

    private async patchSameProductSupplierNames(
        supplierCode: string,
        codeTranslation: CodeTranslation,
        userId: string,
    ): Promise<true> {
        try {
            let successCount = 0;
            const productsToPatch: Product[] =
                await this.productRepository.find({
                    where: {
                        supplierCode,
                        productCode: IsNull(),
                        status: Status.NEW_WARN,
                    },
                });

            for (const product of productsToPatch) {
                const { affected }: { affected?: number | null | undefined } =
                    await this.productRepository.update(
                        { id: product.id },
                        {
                            productCode: codeTranslation,
                            updatedBy: userId,
                            updatedAt: new Date(),
                            status: Status.NEW,
                        },
                    );
                if (affected !== 1)
                    throw new Error(
                        'Error while patching product with the same supplier names as currently patched product.',
                    );
                successCount++;
            }
            if (successCount !== productsToPatch.length)
                throw new Error('Not all products were patched ! ! !');
            return true;
        } catch (err) {
            throw new ProductException(
                `Error while patching product with the same supplier names as currently patched product. Supplier code: ${supplierCode}.`,
                {
                    cause: err,
                },
            );
        }
    }

    private async validateToDelete(productIds: number[]): Promise<void> {
        try {
            const products: Product[] = await this.productRepository.find({
                where: {
                    id: In(productIds),
                    status: Status.SUCCESS,
                },
            });

            if (products.length) {
                throw new ProductException(
                    `Error while validating products to delete. Al least one product tried to delete is with status SUCCESS, not allowed to delete. Product ids: ${productIds}.`,
                );
            }
        } catch (err) {
            throw new ProductException(
                `Error while validating products to delete. Product ids: ${productIds}.`,
                {
                    cause: err,
                },
            );
        }
    }
}
