import { Module } from '@nestjs/common';
import { CustomerFetch } from './services/customer-fetch.service';
import { CustomerController } from './controller/customer.controller';
import { CustomerDtoMapper } from './dto/customer-dto.mapper';

@Module({
    controllers: [CustomerController],
    providers: [CustomerFetch, CustomerDtoMapper],
})
export class CustomerModule {}
