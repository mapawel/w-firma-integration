import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { Routes } from 'src/routes/Routes.enum';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceUpdateDTO } from '../dto/invoiceUpdate.dto';
import { InvoiceCreateDTO } from '../dto/invoiceCreate.dto';
import { InvoiceResDTO } from '../dto/invoiceRes.dto';
import { Permissions } from '../../auth/permissions/permissions.decorator';
import { PermissionsEnum } from '../../auth/permissions/permissions.enum';
import { PermissionsGuard } from '../../auth/permissions/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
// import { UserId } from '../../decorators/userId.decorator';
import { ConfigService } from '@nestjs/config';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.INVOICES_ROUTE}`)
export class InvoiceController {
    constructor(
        private readonly invoiceService: InvoiceService,
        private readonly configService: ConfigService,
    ) {}

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.READ_TEMPLATES])
    @Get()
    async getInvoices(): Promise<InvoiceResDTO[]> {
        return await this.invoiceService.getAllInvoices();
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.READ_TEMPLATES])
    @Get(':id')
    async getInvoiceById(
        @Param('id') invoiceId: number,
    ): Promise<InvoiceResDTO> {
        return await this.invoiceService.getInvoiceById(invoiceId);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.CREATE_TEMPLATES])
    @Post()
    async createInvoice(
        @Body() invoiceCreateDTO: InvoiceCreateDTO,
        // @UserId() userId: string,
    ): Promise<InvoiceResDTO> {
        return await this.invoiceService.createInvoice(
            invoiceCreateDTO,
            // userId,
            'exampleUserId',
        );
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.UPDATES_TEMPLATES])
    @Patch(':id')
    async updateInvoice(
        @Param('id') invoiceId: number,
        @Body() invoiceUpdateDTO: InvoiceUpdateDTO,
        // @UserId() userId: string,
    ): Promise<InvoiceResDTO> {
        return await this.invoiceService.updateInvoice(
            invoiceId,
            invoiceUpdateDTO,
            // userId,
            'exampleUserId',
        );
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.DELETE_TEMPLATES])
    @Delete(':id')
    async deleteInvoice(@Param('id') invoiceId: number): Promise<true> {
        return await this.invoiceService.deleteInvoice(invoiceId);
    }
}
