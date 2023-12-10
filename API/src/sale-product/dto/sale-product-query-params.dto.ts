import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Status } from '../status/status.enum';
import { Transform } from 'class-transformer';

export class SaleProductQueryParamsDTO {
    @IsString()
    @IsOptional()
    customerId: string;

    @IsString()
    @IsOptional()
    productCode: string;

    @IsString()
    @IsOptional()
    currency: string;

    @IsEnum({ ...Status, all: 'all' })
    @IsOptional()
    status: Status | 'all';

    @IsString()
    @IsOptional()
    reservationId: string;

    @IsIn([
        'addedAt',
        'updatedAt',
        'customerId',
        'productCode',
        'currency',
        'reservationId',
        'quantity',
        'netPrice',
        'status',
        'supplierCode',
    ])
    @IsOptional()
    sortParam = 'addedAt';

    @IsIn(['DESC', 'ASC'])
    @IsOptional()
    sortDirect: 'DESC' | 'ASC';

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsOptional()
    records = 250;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsOptional()
    skip = 0;
}
