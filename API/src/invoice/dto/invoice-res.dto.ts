import { Supplier } from '../../supplier/supppliers.enum';
import { ProductForInvoiceResDTO } from '../../product/dto/product-for-invoice-res.dto';

export class InvoiceResDTO {
    id: number;
    number: string;
    supplier: Supplier;
    addedBy: string;
    addedAt: Date;
    updatedBy: string;
    updatedAt: Date;
    products: ProductForInvoiceResDTO[];
}
