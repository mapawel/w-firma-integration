import { Module } from '@nestjs/common';
import { CreateOrderController } from './controller/create-order.controller';
import { CreateOrderService } from '../../integrated-systems/wfirma/create-order/service/create-order.service';

@Module({
    controllers: [CreateOrderController],
    providers: [
        {
            provide: 'CREATE_ORDER_SERVICE',
            useClass: CreateOrderService,
        },
    ],
})
export class CreateOrderModule {}
