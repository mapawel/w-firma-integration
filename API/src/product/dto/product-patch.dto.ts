import { IsNumber, IsString } from 'class-validator';

export class ProductPatchDTO {
    @IsNumber()
    productId: number;

    @IsString()
    productCode: string;
}
