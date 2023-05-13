import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entity/Invoice.entity';
import { InvoiceController } from './controller/invoice.controller';
import { InvoiceService } from './services/invoice.service';

@Module({
    imports: [TypeOrmModule.forFeature([Invoice])],
    controllers: [InvoiceController],
    providers: [InvoiceService],
})
export class InvoiceModule {}
