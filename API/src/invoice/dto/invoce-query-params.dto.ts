import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Supplier } from '../../supplier/supppliers.enum';
import { Transform } from 'class-transformer';

export class InvoiceQueryParamsDTO {
    @IsString()
    @IsOptional()
    number: string;

    @IsEnum(Supplier)
    @IsOptional()
    supplier: Supplier;

    @IsIn(['number', 'supplier', 'addedAt', 'updatedAt'])
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
