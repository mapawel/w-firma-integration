import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SaleProductCreateDto {
    @IsString()
    supplierCode: string;

    @Transform(({ value }) => {
        return typeof value === 'string'
            ? Number(value.replace(',', '.'))
            : value;
    })
    @IsNumber()
    quantity: number;

    @Transform(({ value }) => {
        return typeof value === 'string'
            ? Number(value.replace(',', '.'))
            : value;
    })
    @IsNumber()
    netPrice: number;

    @IsString()
    currency: string;

    @IsString()
    supplier: string;
}
