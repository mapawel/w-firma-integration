import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Routes } from 'src/routes/Routes.enum';
import { InvoiceService } from '../services/invoice.service';
// import { InvoiceCreateDTO } from '../dto/invoice-create.dto';
import { InvoiceResDTO } from '../dto/invoice-res.dto';
import { Permissions } from '../../auth/permissions/permissions.decorator';
import { PermissionsEnum } from '../../auth/permissions/permissions.enum';
import { PermissionsGuard } from '../../auth/permissions/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
// import { UserId } from '../../decorators/userId.decorator';
import { ConfigService } from '@nestjs/config';
import { InvoiceQueryParamsDTO } from '../dto/invoce-query-params.dto';
import { InvoiceParamsDTO } from '../dto/invoice-params.dto';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.INVOICES_ROUTE}`)
export class InvoiceController {
    constructor(
        private readonly invoiceService: InvoiceService,
        private readonly configService: ConfigService,
    ) {}

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.READ_PRODUCTS])
    @Get()
    async getInvoiceByNumber(
        @Query() invoiceQueryParams: InvoiceQueryParamsDTO,
    ): Promise<InvoiceResDTO[]> {
        return await this.invoiceService.getAllInvoices(invoiceQueryParams);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.READ_PRODUCTS])
    @Get(':id')
    async getInvoiceById(
        @Param() invoiceParams: InvoiceParamsDTO,
    ): Promise<InvoiceResDTO> {
        return await this.invoiceService.getInvoiceById(invoiceParams.id);
    }
}
