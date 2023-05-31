import { Supplier } from '../../supplier/supppliers.enum';

export class InvoiceResDTO {
    id: number;
    number: string;
    supplier: Supplier;
    addedBy: string;
    addedAt: Date;
    updatedBy: string;
    updatedAt: Date;
    products: any[]; //TODO to change to DTO
}
