import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCreateDTO } from '../dto/product-create.dto';
import { Product } from '../entity/Product.entity';
import { Status } from '../status/status.enum';
import { Invoice } from '../../invoice/entity/Invoice.entity';
import { InvoiceService } from '../../invoice/services/invoice.service';
import { CodeTranslation } from '../../code-translation/entity/Code-translation.entity';
import { BulkUploadResDTO } from '../dto/bulk-upload-res-dto';
import { ProductException } from '../exceptions/product.exception';

@Injectable()
export class ProductUploadService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(CodeTranslation)
        private readonly codeTranslatonRepository: Repository<CodeTranslation>,
        private readonly invoiceServise: InvoiceService,
    ) {}
    private productIds: number[] = [];
    private productsEntityOneInvoice: Product[] = [];
    private currentInvoiceEntity: Invoice | null = null;
    private problemCount = 0;
    private invoicesCount = 0;

    public async uploadBulkProducts(
        productsArray: ProductCreateDTO[],
        userId: string,
    ): Promise<BulkUploadResDTO> {
        try {
            this.resetClassFields();

            productsArray.sort((a, b) =>
                a.invoiceNumber.localeCompare(b.invoiceNumber),
            );

            for (const product of productsArray) {
                if (
                    !this.currentInvoiceEntity ||
                    product.invoiceNumber !== this.currentInvoiceEntity?.number
                ) {
                    this.currentInvoiceEntity =
                        await this.invoiceServise.findOrCreateInvoiceEntity(
                            product.invoiceNumber,
                            product.supplier,
                            userId,
                        );
                    this.invoicesCount++;
                }

                if (
                    product.invoiceNumber !== this.currentInvoiceEntity.number
                ) {
                    await this.saveOneInvoiceProdsAndResetArray(
                        this.productsEntityOneInvoice,
                    );
                }

                const codeTranslation: CodeTranslation | null =
                    await this.codeTranslatonRepository.findOne({
                        where: {
                            supplier: product.supplier,
                            supplierCode: product.supplierCode,
                        },
                    });

                if (!codeTranslation) this.problemCount++;

                const productEntity: Product =
                    await this.createNewProductEntity(
                        product,
                        codeTranslation,
                        this.currentInvoiceEntity,
                        userId,
                    );
                this.productsEntityOneInvoice.push(productEntity);
            }

            await this.saveOneInvoiceProdsAndResetArray(
                this.productsEntityOneInvoice,
            );

            return {
                canAutoProceed: !this.problemCount,
                problemCount: this.problemCount,
                successCount: this.productIds.length - this.problemCount,
                invoicesCount: this.invoicesCount,
                productIds: this.productIds,
            };
        } catch (err) {
            throw new ProductException(
                `Error while uploading products. First product of array: ${JSON.stringify(
                    productsArray?.[0],
                    null,
                    2,
                )}. Products array length: ${productsArray.length}.`,
                {
                    cause: err,
                },
            );
        }
    }

    private async createNewProductEntity(
        product: ProductCreateDTO,
        productCode: CodeTranslation | null,
        currentInvoiceEntity: Invoice,
        userId: string,
    ): Promise<Product> {
        try {
            return this.productRepository.create({
                ...product,
                productCode: productCode || undefined,
                invoice: currentInvoiceEntity,
                status: Status.NEW,
                addedBy: userId,
                addedAt: new Date(Date.now()),
            });
        } catch (err) {
            throw new ProductException(
                `Error while creating new product entity. Product: ${JSON.stringify(
                    product,
                    null,
                    2,
                )}.`,
                {
                    cause: err,
                },
            );
        }
    }

    private async saveOneInvoiceProdsAndResetArray(
        productsEntityOneInvoice: Product[],
    ): Promise<void> {
        try {
            await this.productRepository.save(productsEntityOneInvoice);
            productsEntityOneInvoice.forEach((product: Product) =>
                this.productIds.push(product.id),
            );
            productsEntityOneInvoice.length = 0;
        } catch (err) {
            throw new ProductException(
                `Error while saving products from one invoice. First product from array: ${JSON.stringify(
                    productsEntityOneInvoice?.[0],
                    null,
                    2,
                )}. Products array length: ${productsEntityOneInvoice.length}.`,
                {
                    cause: err,
                },
            );
        }
    }

    private resetClassFields(): void {
        this.productIds.length = 0;
        this.productsEntityOneInvoice.length = 0;
        this.currentInvoiceEntity = null;
        this.problemCount = 0;
        this.invoicesCount = 0;
    }
}
