import { ProductCreateDTO } from '../../product/dto/product-create.dto';

export class UploadResDTO {
    totalValue: number;
    totalQty: number;
    totalPositions: number;
    data: ProductCreateDTO[];
}
