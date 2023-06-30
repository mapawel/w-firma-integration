import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Supplier } from '../../supplier/supppliers.enum';
import { Status } from '../status/status.enum';
import { Transform } from 'class-transformer';

export class ProductQueryParamsDTO {
    @IsString()
    @IsOptional()
    supplierCode?: string;

    @IsString()
    @IsOptional()
    productCode: string;

    @IsString()
    @IsOptional()
    currency: string;

    @IsEnum(Supplier)
    @IsOptional()
    supplier: Supplier;

    @IsEnum({ ...Status, all: 'all' })
    @IsOptional()
    status: Status | 'all';

    @IsString()
    @IsOptional()
    invoice: string;

    @IsIn([
        'addedAt',
        'updatedAt',
        'invoice',
        'supplierCode',
        'productCode',
        'currency',
        'supplier',
        'quantity',
        'netPrice',
        'grossPrice',
        'status',
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
