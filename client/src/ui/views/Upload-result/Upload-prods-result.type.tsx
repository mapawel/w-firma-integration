import { ProductType } from './Product.type';

export type UploadProductsResDTO = {
    totalValue: number;
    totalQty: number;
    totalPositions: number;
    data: ProductType[];
};
