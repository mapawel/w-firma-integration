import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeTranslation } from '../code-translation/entity/Code-translation.entity';
import { SaleProduct } from './entity/Sale-product.entity';
import { SaleProductController } from './controller/sale-product.controller';
import { SaleProductUploadService } from './services/sale-product-upload.service';

@Module({
    imports: [TypeOrmModule.forFeature([SaleProduct, CodeTranslation])],
    controllers: [SaleProductController],
    providers: [SaleProductUploadService],
})
export class SaleProductModule {}
