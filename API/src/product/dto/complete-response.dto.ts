import { ProductResDTO } from './product-res.dto';

export class CompleteResponseDTO {
    products: ProductResDTO[];
    totalProducts: number;
    uniqueInvoiceNumbers: string[];
}
