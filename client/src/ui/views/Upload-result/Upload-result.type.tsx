import { ProductType } from './Product.type';

export type UploadResDTO = {
    totalValue: number;
    totalQty: number;
    totalPositions: number;
    data: ProductType[];
};
