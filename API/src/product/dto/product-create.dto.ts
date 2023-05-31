import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Supplier } from '../../supplier/supppliers.enum';

export class ProductCreateDTO {
    @IsString()
    supplierIndex: string;

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
    invoiceNumber: string;

    @IsEnum(Supplier)
    supplier: Supplier;
}
