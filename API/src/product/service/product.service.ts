import { Injectable } from '@nestjs/common';
import { ProductCreateDTO } from '../dto/product-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/Product.entity';
import { Repository } from 'typeorm';
import { Status } from '../status/status.enum';
import { Invoice } from '../../invoice/entity/Invoice.entity';
import { productResDtoMapper } from '../dto/product-res-dto.mapper';
import { ProductResDTO } from '../dto/product-res.dto';
import { InvoiceService } from 'src/invoice/services/invoice.service';
import { ProductQueryParams } from '../controller/product.controller';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly invoiceServise: InvoiceService,
    ) {}

    public async uploadBulkProducts(
        productsArray: ProductCreateDTO[],
        userId: string,
    ): Promise<ProductResDTO[]> {
        const productResDtos: ProductResDTO[] = [];
        const productsEntityOneInvoice: Product[] = [];
        let currentInvoiceEntity: Invoice | null = null;

        productsArray.sort((a, b) =>
            a.invoiceNumber.localeCompare(b.invoiceNumber),
        );

        for (const product of productsArray) {
            if (
                !currentInvoiceEntity ||
                product.invoiceNumber !== currentInvoiceEntity?.number
            ) {
                currentInvoiceEntity =
                    await this.invoiceServise.findOrCreateInvoiceEntity(
                        product.invoiceNumber,
                        product.supplier,
                        userId,
                    );
            }

            if (product.invoiceNumber !== currentInvoiceEntity.number) {
                await this.productRepository.save(productsEntityOneInvoice);
                productsEntityOneInvoice.length = 0;
            }

            const productEntity: Product = await this.createNewProductEntity(
                product,
                currentInvoiceEntity,
                userId,
            );
            productsEntityOneInvoice.push(productEntity);

            productResDtos.push(productResDtoMapper(productEntity));
        }
        await this.productRepository.save(productsEntityOneInvoice);
        productsEntityOneInvoice.length = 0;

        return productResDtos;
    }

    public async getAllProducts(
        productQueryParams: ProductQueryParams,
    ): Promise<ProductResDTO[]> {
        try {
            const {
                supplierIndex,
                currency,
                supplier,
                sortParam,
                sortDirect,
                records,
                skip,
            }: ProductQueryParams = productQueryParams;

            const allProducts: Product[] = await this.productRepository.find({
                where: {
                    supplierIndex,
                    currency,
                    supplier,
                },
                relations: {
                    invoice: true,
                },
                order: {
                    [sortParam]: sortDirect,
                },
                take: records,
                skip,
            });

            return allProducts.map((product: Product) =>
                productResDtoMapper(product),
            );
        } catch (error) {
            throw new Error('Error while getting all products.', {
                cause: error,
            });
        }
    }

    private async createNewProductEntity(
        product: ProductCreateDTO,
        currentInvoiceEntity: Invoice,
        userId: string,
    ): Promise<Product> {
        return this.productRepository.create({
            ...product,
            invoice: currentInvoiceEntity,
            status: Status.NEW,
            addedBy: userId,
            addedAt: new Date(Date.now()),
        });
    }
}
