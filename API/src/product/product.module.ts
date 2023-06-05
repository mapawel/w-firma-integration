import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/Product.entity';
import { Invoice } from '../invoice/entity/Invoice.entity';
import { InvoiceService } from '../invoice/services/invoice.service';
import { CodeTranslation } from '../code-translation/entity/Code-translation.entity';
import { CreateOrderService } from '../integrated-systems/wfirma/create-order/service/create-order.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Invoice, CodeTranslation])],
    controllers: [ProductController],
    providers: [ProductService, InvoiceService, CreateOrderService],
})
export class ProductModule {}
