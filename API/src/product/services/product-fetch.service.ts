import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/Product.entity';
import { productResDtoMapper } from '../dto/product-res-dto.mapper';
import { ProductQueryParams } from '../types/product-query-params.type';
import { ProductException } from '../exceptions/product.exception';
import { CompleteResponseDTO } from '../dto/complete-response.dto';
import { Invoice } from 'src/invoice/entity/Invoice.entity';

@Injectable()
export class ProductFetchService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    public async getAllProducts(
        productQueryParams: ProductQueryParams,
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
            }: ProductQueryParams = productQueryParams;

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
}
