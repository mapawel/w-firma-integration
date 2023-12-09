import { SaleProductType } from '@/ui/views/Upload-result/Sale-product.type';

export type UploadSaleResDTO = {
    totalValue: number;
    totalQty: number;
    totalPositions: number;
    data: SaleProductType[];
};
