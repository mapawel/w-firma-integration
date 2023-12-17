import { Controller, Get, UseGuards } from '@nestjs/common';
import { Routes } from '../../routes/Routes.enum';
import { CustomerFetch } from '../services/customer-fetch.service';
import { CustomersResDTO } from '../dto/customers-res.dto';
import { PermissionsGuard } from '../../auth/permissions/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsEnum } from '../../auth/permissions/permissions.enum';
import { Permissions } from '../../auth/permissions/permissions.decorator';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.CUSTOMERS_ROUTE}`)
export class CustomerController {
    constructor(private readonly customerFetchService: CustomerFetch) {}

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.READ_PRODUCTS])
    @Get()
    public async getCustomers(): Promise<CustomersResDTO> {
        return await this.customerFetchService.getAllCustomers();
    }
}
