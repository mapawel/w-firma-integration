import { SaleProductResDTO } from '@/domains/sale-and-sale-upload/dto/sale-products-res.dto';

export type ResponseFromSaleProductFetchDto = {
    saleProducts: SaleProductResDTO[];
    totalSaleProducts: number;
    uniqueReservationIds: string[];
};
