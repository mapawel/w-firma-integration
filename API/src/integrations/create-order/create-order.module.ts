import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateOrderController } from './controller/create-order.controller';
import { CreateOrderService } from '../../integrated-systems/wfirma/create-order/service/create-order.service';
import { Product } from '../../product/entity/Product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [CreateOrderController],
    providers: [
        {
            provide: 'CREATE_ORDER_SERVICE',
            useClass: CreateOrderService,
        },
    ],
})
export class CreateOrderModule {}
