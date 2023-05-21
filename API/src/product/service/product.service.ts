import { Injectable } from '@nestjs/common';
import { ProductCreateDTO } from '../dto/product-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/Product.entity';
import { Repository } from 'typeorm';
import { Status } from '../status/status.enum';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}
    public async uploadBulkProducts(
        productsArray: ProductCreateDTO[],
        userId: string,
    ) {
        const entities: Product[] = productsArray.map(
            (product: ProductCreateDTO) =>
                this.productRepository.create({
                    ...product,
                    status: Status.NEW,
                    addedBy: userId,
                    addedAt: new Date(Date.now()),
                }),
        );

        await this.productRepository.save(entities);

        return 'OKO';
    }
}
