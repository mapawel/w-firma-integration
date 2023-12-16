import {
    Body,
    Controller,
    Get,
    Inject,
    ParseArrayPipe,
    Post,
} from '@nestjs/common';
import { Routes } from '../../../routes/Routes.enum';
import { CreateOrderBaseClass } from '../interface/create-order.base-class';
import { CreateOrderResDTO } from '../../../integrated-systems/wfirma/create-order/dto/create-order-res.dto';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.ORDERS_ROUTE}`)
export class CreateOrderController {
    constructor(
        @Inject('CREATE_ORDER_SERVICE')
        private readonly createOrderService: CreateOrderBaseClass,
    ) {}

    // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // @Permissions([PermissionsEnum.ADD_PRODUCTS])
    @Get(Routes.PRODUCTS_ROUTE_REFRESH)
    public async refreshProductsFromSystem(): Promise<boolean> {
        return await this.createOrderService.refreshProductsFromSystem();
    }

    // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // @Permissions([PermissionsEnum.ADD_PRODUCTS])
    @Post()
    public async createSystemOrder(
        @Body(new ParseArrayPipe({ items: Number })) productIds: number[],
    ): Promise<CreateOrderResDTO> {
        return await this.createOrderService.createSystemOrder(productIds);
    }
}
