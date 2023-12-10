import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../status/status.enum';
import { CodeTranslation } from '../../code-translation/entity/Code-translation.entity';
import { SaleProductException } from '../exceptions/sale-product.exception';
import { SaleProduct } from '../entity/Sale-product.entity';
import { SaleProductCreateDto } from '../dto/sale-product-create.dto';
import { BulkSaleUploadResDto } from '../dto/bulk-sale-upload-res-dto';

@Injectable()
export class SaleProductUploadService {
    private productIds: number[] = [];
    private problemCount = 0;
    private saleProductsEntities: SaleProduct[] = [];

    constructor(
        @InjectRepository(SaleProduct)
        private readonly productSaleRepository: Repository<SaleProduct>,
        @InjectRepository(CodeTranslation)
        private readonly codeTranslationRepository: Repository<CodeTranslation>,
    ) {}

    public async uploadBulkSaleProducts(
        productsArray: SaleProductCreateDto[],
        userId: string,
    ): Promise<BulkSaleUploadResDto> {
        try {
            this.resetClassFields();

            for (const product of productsArray) {
                const codeTranslation: CodeTranslation | null =
                    await this.codeTranslationRepository.findOne({
                        where: {
                            supplierCode: product.supplierCode,
                        },
                    });

                if (!codeTranslation) this.problemCount++;

                const productEntity: SaleProduct =
                    await this.createNewSaleProductEntity(
                        product,
                        codeTranslation,
                        codeTranslation ? Status.NEW : Status.NEW_WARN,
                        userId,
                    );
                this.saleProductsEntities.push(productEntity);
            }

            await this.saveAllEntitiesAndResetArray(this.saleProductsEntities);

            return {
                canAutoProceed: !this.problemCount,
                problemCount: this.problemCount,
                successCount: this.productIds.length - this.problemCount,
                productIds: this.productIds,
            };
        } catch (err) {
            if (err instanceof BadRequestException) throw err;
            throw new SaleProductException(
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

    private async createNewSaleProductEntity(
        product: SaleProductCreateDto,
        productCode: CodeTranslation | null,
        status: Status,
        userId: string,
    ): Promise<SaleProduct> {
        try {
            return this.productSaleRepository.create({
                ...product,
                productCode: productCode || undefined,
                status,
                addedBy: userId,
                addedAt: new Date(Date.now()),
            });
        } catch (err) {
            throw new SaleProductException(
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

    private async saveAllEntitiesAndResetArray(
        saleProductsEntities: SaleProduct[],
    ): Promise<void> {
        try {
            await this.productSaleRepository.save(saleProductsEntities);
            saleProductsEntities.forEach((product: SaleProduct) =>
                this.productIds.push(product.id),
            );
            saleProductsEntities.length = 0;
        } catch (err) {
            throw new SaleProductException(
                `Error while saving products for reservation from one batch. First product from array: ${JSON.stringify(
                    saleProductsEntities?.[0],
                    null,
                    2,
                )}. Products array length: ${saleProductsEntities.length}.`,
                {
                    cause: err,
                },
            );
        }
    }

    private resetClassFields(): void {
        this.productIds.length = 0;
        this.problemCount = 0;
        this.saleProductsEntities.length = 0;
    }
}
