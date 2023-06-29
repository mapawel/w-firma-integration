import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductCreateDTO } from './product-create.dto';

export class ProductCreatePayloadDTO {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductCreateDTO)
    productsArray: ProductCreateDTO[];
}
