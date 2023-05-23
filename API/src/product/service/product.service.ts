import { Injectable } from '@nestjs/common';
import { ProductCreateDTO } from '../dto/product-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/Product.entity';
import { Repository } from 'typeorm';
import { Status } from '../status/status.enum';
import { Invoice } from '../../invoice/entity/Invoice.entity';
import { productResDtoMapper } from '../dto/product-res-dto.mapper';
import { ProductResDTO } from '../dto/product-res.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Invoice)
        private readonly invoiceRepository: Repository<Invoice>,
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
            if (!currentInvoiceEntity) {
                currentInvoiceEntity = await this.findOrCreateInvoiceEntity(
                    product.invoiceNumber,
                    userId,
                );
            }

            if (product.invoiceNumber !== currentInvoiceEntity.number) {
                currentInvoiceEntity = await this.findOrCreateInvoiceEntity(
                    product.invoiceNumber,
                    userId,
                );
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

    public async getAllProducts(): Promise<ProductResDTO[]> {
        try {
            const allProducts: Product[] = await this.productRepository.find({
                relations: {
                    invoice: true,
                },
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

    private async findOrCreateInvoiceEntity(
        invoiceNo: string,
        userId: string,
    ): Promise<Invoice> {
        let invoiceEntity: Invoice | null = null;

        invoiceEntity = await this.invoiceRepository.findOne({
            where: {
                number: invoiceNo,
            },
        });

        if (!invoiceEntity) {
            const newInvoice = this.invoiceRepository.create({
                number: invoiceNo,
                addedBy: userId,
                addedAt: new Date(Date.now()),
                products: [],
            });
            invoiceEntity = await this.invoiceRepository.save(newInvoice);
        }
        return invoiceEntity;
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
