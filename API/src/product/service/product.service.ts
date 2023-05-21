import { Injectable } from '@nestjs/common';
import { ProductCreateDTO } from '../dto/product-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/Product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}
    public async uploadBulkProducts(productsArray: ProductCreateDTO[]) {
        const entities: Product[] = productsArray.map(
            (product: ProductCreateDTO) =>
                this.productRepository.create(product),
        );

        await this.productRepository.save(entities);

        return 'OKO';
    }
}
