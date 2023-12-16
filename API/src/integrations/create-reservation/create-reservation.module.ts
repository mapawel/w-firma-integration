import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateReservationService } from '../../integrated-systems/wfirma/create-reservation/service/create-reservation.service';
import { CreateReservationController } from './controller/create-reservation.controller';
import { SaleProduct } from '../../sale-product/entity/Sale-product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SaleProduct])],
    controllers: [CreateReservationController],
    providers: [
        {
            provide: 'CREATE_RESERVATION_SERVICE',
            useClass: CreateReservationService,
        },
    ],
})
export class CreateReservationModule {}
