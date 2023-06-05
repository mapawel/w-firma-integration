import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { ProductCreateDTO } from '../dto/product-create.dto';
import { Product } from '../entity/Product.entity';
import { Status } from '../status/status.enum';
import { Invoice } from '../../invoice/entity/Invoice.entity';
import { productResDtoMapper } from '../dto/product-res-dto.mapper';
import { ProductResDTO } from '../dto/product-res.dto';
import { InvoiceService } from '../../invoice/services/invoice.service';
import { ProductQueryParams } from '../types/product-query-params.type';
import { CodeTranslation } from '../../code-translation/entity/Code-translation.entity';
import { BulkUploadResDTO } from '../dto/bulk-upload-res-dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(CodeTranslation)
        private readonly codeTranslatonRepository: Repository<CodeTranslation>,
        private readonly invoiceServise: InvoiceService,
    ) {}

    public async uploadBulkProducts(
        productsArray: ProductCreateDTO[],
        userId: string,
    ): Promise<BulkUploadResDTO> {
        const productIds: number[] = [];
        const productsEntityOneInvoice: Product[] = [];
        let currentInvoiceEntity: Invoice | null = null;
        let problemCount = 0;
        let invoicesCount = 0;

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
                invoicesCount++;
            }

            if (product.invoiceNumber !== currentInvoiceEntity.number) {
                await this.productRepository.save(productsEntityOneInvoice);
                productsEntityOneInvoice.forEach((product: Product) =>
                    productIds.push(product.id),
                );
                productsEntityOneInvoice.length = 0;
            }

            const codeTranslation: CodeTranslation | null =
                await this.codeTranslatonRepository.findOne({
                    where: {
                        supplier: product.supplier,
                        supplierCode: product.supplierCode,
                    },
                });

            if (!codeTranslation) problemCount++;

            const productEntity: Product = await this.createNewProductEntity(
                product,
                codeTranslation,
                currentInvoiceEntity,
                userId,
            );
            productsEntityOneInvoice.push(productEntity);
        }

        await this.productRepository.save(productsEntityOneInvoice);
        productsEntityOneInvoice.forEach((product: Product) =>
            productIds.push(product.id),
        );
        productsEntityOneInvoice.length = 0;

        return {
            canAutoProceed: !problemCount,
            problemCount,
            successCount: productIds.length,
            invoicesCount,
            productIds,
        };
    }

    public async getAllProducts(
        productQueryParams: ProductQueryParams,
    ): Promise<ProductResDTO[]> {
        try {
            const {
                supplierCode,
                currency,
                supplier,
                productCode,
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
        } catch (error) {
            throw new Error('Error while getting all products.', {
                cause: error,
            });
        }
    }

    private async createNewProductEntity(
        product: ProductCreateDTO,
        productCode: CodeTranslation | null,
        currentInvoiceEntity: Invoice,
        userId: string,
    ): Promise<Product> {
        return this.productRepository.create({
            ...product,
            productCode: productCode || undefined,
            invoice: currentInvoiceEntity,
            status: Status.NEW,
            addedBy: userId,
            addedAt: new Date(Date.now()),
        });
    }
}
