import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/Product.entity';
import { Invoice } from 'src/invoice/entity/Invoice.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Invoice])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
