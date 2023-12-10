import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SaleProductCreateDto } from './sale-product-create.dto';

export class SaleProductCreatePayloadDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SaleProductCreateDto)
    productsArray: SaleProductCreateDto[];
}
