import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/Product.entity';
import { Invoice } from 'src/invoice/entity/Invoice.entity';
import { InvoiceService } from 'src/invoice/services/invoice.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Invoice])],
    controllers: [ProductController],
    providers: [ProductService, InvoiceService],
})
export class ProductModule {}
