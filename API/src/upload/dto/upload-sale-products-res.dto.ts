import { Status } from '../../product/status/status.enum';
import { SaleProductCreateDto } from '../../sale-product/dto/sale-product-create.dto';

export class UploadSaleProductsResDTO {
    totalValue: number;
    totalQty: number;
    totalPositions: number;
    data: SaleProductCreateDto[];
    status: Status;
}
