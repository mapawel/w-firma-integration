import { IsNumber, IsString } from 'class-validator';

export class SaleProductPatchDto {
    @IsNumber()
    productId: number;

    @IsString()
    productCode: string;
}
