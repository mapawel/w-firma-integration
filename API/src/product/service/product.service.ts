import { Injectable } from '@nestjs/common';
import { ProductCreateDTO } from '../dto/product-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/Product.entity';
import { Repository } from 'typeorm';
import { Status } from '../status/status.enum';
import { Invoice } from '../../invoice/entity/Invoice.entity';
import { productResDtoMapper } from '../dto/product-res-dto.mapper';
import { ProductResDTO } from '../dto/product-res.dto';
import { InvoiceService } from '../../invoice/services/invoice.service';
import { ProductQueryParams } from '../types/product-query-params.type';
import { CodeTranslation } from 'src/code-translation/entity/Code-translation.entity';
import { Supplier } from 'src/supplier/supppliers.enum';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(CodeTranslation)
        private readonly codeTranslatonRepository: Repository<CodeTranslation>,
        private readonly invoiceServise: InvoiceService,
    ) {}
    private currentSupplierCodeTranslationsMap: Map<string, string> = new Map();

    public async uploadBulkProducts(
        productsArray: ProductCreateDTO[],
        userId: string,
    ): Promise<ProductResDTO[]> {
        console.time('uploadBulkProducts');

        const productResDtos: ProductResDTO[] = [];
        const productsEntityOneInvoice: Product[] = [];
        let currentInvoiceEntity: Invoice | null = null;

        productsArray.sort((a, b) =>
            a.invoiceNumber.localeCompare(b.invoiceNumber),
        );
        this.populateCurrentSupplierCodeTranslations(
            productsArray[0]?.supplier,
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

            const PN: string | undefined =
                this.currentSupplierCodeTranslationsMap.get(
                    product.supplierCode,
                );

            const productEntity: Product = await this.createNewProductEntity(
                product,
                PN,
                currentInvoiceEntity,
                userId,
            );
            productsEntityOneInvoice.push(productEntity);

            productResDtos.push(productResDtoMapper(productEntity));
        }
        await this.productRepository.save(productsEntityOneInvoice);
        productsEntityOneInvoice.length = 0;

        console.timeEnd('uploadBulkProducts');
        return productResDtos;
    }

    public async getAllProducts(
        productQueryParams: ProductQueryParams,
    ): Promise<ProductResDTO[]> {
        try {
            const {
                supplierCode,
                currency,
                supplier,
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
        PN: string | undefined,
        currentInvoiceEntity: Invoice,
        userId: string,
    ): Promise<Product> {
        return this.productRepository.create({
            ...product,
            PN,
            invoice: currentInvoiceEntity,
            status: Status.NEW,
            addedBy: userId,
            addedAt: new Date(Date.now()),
        });
    }

    private async populateCurrentSupplierCodeTranslations(
        supplier: Supplier,
    ): Promise<void> {
        const currentSupplierCodeTranslations: CodeTranslation[] =
            await this.codeTranslatonRepository.find({
                where: {
                    supplier,
                },
            });
        for (const codeTranslation of currentSupplierCodeTranslations) {
            this.currentSupplierCodeTranslationsMap.set(
                codeTranslation.supplierCode,
                codeTranslation.PN,
            );
        }
    }
}
