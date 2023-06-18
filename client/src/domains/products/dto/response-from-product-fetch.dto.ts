import { ProductResDTO } from './products-res.dto';

export type ResponseFromProductFetchDTO = {
    products: ProductResDTO[];
    totalProducts: number;
    uniqueInvoiceNumbers: string[];
};
