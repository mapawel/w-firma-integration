import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductFetchAndDeleteAndPatchService } from './services/product-fetch-delete-patch.service';
import { ProductUploadService } from './services/product-upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/Product.entity';
import { Invoice } from '../invoice/entity/Invoice.entity';
import { InvoiceService } from '../invoice/services/invoice.service';
import { CodeTranslation } from '../code-translation/entity/Code-translation.entity';
import { CreateOrderService } from '../integrated-systems/wfirma/create-order/service/create-order.service';
import { CodeTranslationService } from 'src/code-translation/service/code-translation.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Invoice, CodeTranslation])],
    controllers: [ProductController],
    providers: [
        ProductFetchAndDeleteAndPatchService,
        ProductUploadService,
        InvoiceService,
        CreateOrderService,
        CodeTranslationService,
    ],
})
export class ProductModule {}
