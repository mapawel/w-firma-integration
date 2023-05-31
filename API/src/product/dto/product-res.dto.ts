import { Status } from '../status/status.enum';

export class ProductResDTO {
    id: number;
    supplierIndex: string;
    quantity: number;
    netPrice: number;
    currency: string;
    invoice: string;
    supplier: string;
    status: Status;
    addedBy: string;
    addedAt: Date;
    updatedBy: string;
    updatedAt: Date;
}
