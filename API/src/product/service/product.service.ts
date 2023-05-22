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
    private test = 0;
    public async uploadBulkProducts(
        productsArray: ProductCreateDTO[],
        userId: string,
    ): Promise<ProductResDTO[]> {
        const productResDtos: ProductResDTO[] = [];
        let currentInvoiceEntity: Invoice | null = null;
        productsArray.sort((a, b) =>
            a.invoiceNumber.localeCompare(b.invoiceNumber),
        );

        for (const product of productsArray) {
            if (!currentInvoiceEntity) {
                currentInvoiceEntity = await this.findOrCreateInvoice(
                    product.invoiceNumber,
                    userId,
                );
            }

            if (product.invoiceNumber !== currentInvoiceEntity.number) {
                currentInvoiceEntity = await this.findOrCreateInvoice(
                    product.invoiceNumber,
                    userId,
                );
            }

            const newProduct: Product = this.productRepository.create({
                ...product,
                invoice: currentInvoiceEntity,
                status: Status.NEW,
                addedBy: userId,
                addedAt: new Date(Date.now()),
            });

            const productEntity: Product = await this.productRepository.save(
                newProduct,
            );

            productResDtos.push(productResDtoMapper(productEntity));
        }

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

    private async findOrCreateInvoice(
        invoiceNo: string,
        userId: string,
    ): Promise<Invoice> {
        let invoice: Invoice | null = null;

        invoice = await this.invoiceRepository.findOne({
            where: {
                number: invoiceNo,
            },
        });

        if (!invoice) {
            this.test += 1;
            const newInvoice = this.invoiceRepository.create({
                number: invoiceNo,
                addedBy: userId,
                addedAt: new Date(Date.now()),
                products: [],
            });
            invoice = await this.invoiceRepository.save(newInvoice);
        }
        return invoice;
    }
}
