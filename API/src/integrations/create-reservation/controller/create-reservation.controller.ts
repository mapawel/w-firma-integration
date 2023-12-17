import {
    Body,
    Controller,
    Get,
    Inject,
    ParseArrayPipe,
    Post,
    UseGuards,
} from '@nestjs/common';
import { Routes } from '../../../routes/Routes.enum';
import { CreateReservationBaseClass } from '../interface/create-reservation.base-class';
import { CreateOrderResDTO } from '../../../integrated-systems/wfirma/create-order/dto/create-order-res.dto';
import { PermissionsGuard } from '../../../auth/permissions/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsEnum } from '../../../auth/permissions/permissions.enum';
import { Permissions } from '../../../auth/permissions/permissions.decorator';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.RESERVATIONS_ROUTE}`)
export class CreateReservationController {
    constructor(
        @Inject('CREATE_RESERVATION_SERVICE')
        private readonly createOrderService: CreateReservationBaseClass,
    ) {}

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.ADD_PRODUCTS])
    @Get(Routes.PRODUCTS_ROUTE_REFRESH)
    public async refreshProductsFromSystem(): Promise<boolean> {
        return await this.createOrderService.refreshProductsFromSystem();
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.ADD_PRODUCTS])
    @Post()
    public async createSystemOrder(
        @Body(new ParseArrayPipe({ items: Number })) productIds: number[],
    ): Promise<CreateOrderResDTO> {
        return await this.createOrderService.createSystemReservation(
            productIds,
        );
    }
}
