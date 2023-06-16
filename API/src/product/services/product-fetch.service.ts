import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Product } from '../entity/Product.entity';
import { productResDtoMapper } from '../dto/product-res-dto.mapper';
import { ProductResDTO } from '../dto/product-res.dto';
import { ProductQueryParams } from '../types/product-query-params.type';
import { ProductException } from '../exceptions/product.exception';

@Injectable()
export class ProductFetchService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    public async getAllProducts(
        productQueryParams: ProductQueryParams,
    ): Promise<ProductResDTO[]> {
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

            const allProducts: Product[] = await this.productRepository.find({
                where: {
                    supplierCode,
                    currency,
                    supplier,
                    status,
                    productCode:
                        productCode === 'null' ? IsNull() : { PN: productCode },
                    invoice: { number: invoice },
                },
                relations: ['productCode', 'invoice'],
                order: {
                    [sortParam]: sortDirect,
                },
                take: records,
                skip,
            });

            return allProducts.map((product: Product) =>
                productResDtoMapper(product),
            );
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
