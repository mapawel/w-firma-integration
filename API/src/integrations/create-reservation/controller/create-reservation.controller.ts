import { Body, Controller, Inject, ParseArrayPipe, Post } from '@nestjs/common';
import { Routes } from '../../../routes/Routes.enum';
import { CreateReservationBaseClass } from '../interface/create-reservation.base-class';
import { CreateOrderResDTO } from '../../../integrated-systems/wfirma/create-order/dto/create-order-res.dto';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.RESERVATIONS_ROUTE}`)
export class CreateReservationController {
    constructor(
        @Inject('CREATE_RESERVATION_SERVICE')
        private readonly createOrderService: CreateReservationBaseClass,
    ) {}

    // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // @Permissions([PermissionsEnum.ADD_PRODUCTS])
    // @Get(Routes.ORDERS_ROUTE_REFRESH) //todo !!!!
    // public async refreshProductsFromSystem(): Promise<boolean> {
    //     return await this.createOrderService.refreshProductsFromSystem();
    // }

    // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // @Permissions([PermissionsEnum.ADD_PRODUCTS])
    @Post()
    public async createSystemOrder(
        @Body(new ParseArrayPipe({ items: Number })) productIds: number[],
    ): Promise<CreateOrderResDTO> {
        return await this.createOrderService.createSystemReservation(
            productIds,
        );
    }
}
