import { Controller, Post, Get, Body, Inject } from '@nestjs/common';
import { Routes } from '../../../routes/Routes.enum';
import { CreateOrderBaseClass } from '../interface/create-order.base-class';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.ORDERS_ROUTE}`)
export class CreateOrderController {
    constructor(
        @Inject('CREATE_ORDER_SERVICE')
        private readonly createOrderService: CreateOrderBaseClass,
    ) {}

    @Get(Routes.ORDERS_ROUTE_REFRESH)
    public async refreshProductsFromSystem(): Promise<boolean> {
        return await this.createOrderService.refreshProductsFromSystem();
    }

    @Post()
    public async createSystemOrder(
        @Body() productIds: number[],
    ): Promise<boolean> {
        return await this.createOrderService.createSystemOrder(productIds);
    }
}
