import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Supplier } from '../../supplier/supppliers.enum';
import { Transform } from 'class-transformer';

export class CodeTranslationParamsDTO {
    @IsString()
    @IsOptional()
    supplierCode: string;

    @IsEnum(Supplier)
    @IsOptional()
    supplier: Supplier;

    @IsString()
    @IsOptional()
    PN: string;

    @IsIn(['supplier', 'supplierCode', 'PN', 'addedAt', 'updatedAt'])
    @IsOptional()
    sortParam = 'supplierCode';

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
