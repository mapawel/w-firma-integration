import { ProductCreateDTO } from '../../product/dto/product-create.dto';
import { Status } from '../../product/status/status.enum';

export class UploadResDTO {
    totalValue: number;
    totalQty: number;
    totalPositions: number;
    data: ProductCreateDTO[];
    status: Status;
}
