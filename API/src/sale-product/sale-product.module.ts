import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeTranslation } from '../code-translation/entity/Code-translation.entity';
import { SaleProduct } from './entity/Sale-product.entity';
import { SaleProductController } from './controller/sale-product.controller';
import { SaleProductUploadService } from './services/sale-product-upload.service';
import { SaleProductCrudService } from './services/sale-product-crud.service';
import { CodeTranslationService } from '../code-translation/service/code-translation.service';

@Module({
    imports: [TypeOrmModule.forFeature([SaleProduct, CodeTranslation])],
    controllers: [SaleProductController],
    providers: [
        SaleProductUploadService,
        SaleProductCrudService,
        CodeTranslationService,
    ],
})
export class SaleProductModule {}
