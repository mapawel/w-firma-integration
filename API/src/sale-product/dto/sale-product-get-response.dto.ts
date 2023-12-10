import { SaleProductResDTO } from './sale-product-res.dto';

export class SaleProductGetResponseDTO {
    saleProducts: SaleProductResDTO[];
    totalSaleProducts: number;
    uniqueReservationIds: string[];
}
