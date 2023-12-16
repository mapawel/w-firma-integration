import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../product/entity/Product.entity';
import { CreateReservationService } from '../../integrated-systems/wfirma/create-reservation/service/create-reservation.service';
import { CreateReservationController } from './controller/create-reservation.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [CreateReservationController],
    providers: [
        {
            provide: 'CREATE_RESERVATION_SERVICE',
            useClass: CreateReservationService,
        },
    ],
})
export class CreateReservationModule {}
