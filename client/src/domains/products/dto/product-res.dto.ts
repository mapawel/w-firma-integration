import { Supplier } from '@/domains/supplier/supppliers.enum';
import { Status } from '../status/status.enum';

export type ProductResDTO = {
    id: number;
    supplierCode: string;
    productCode: string | undefined;
    quantity: number;
    netPrice: number;
    currency: string;
    invoice: string;
    supplier: Supplier;
    status: Status;
    addedBy: string;
    addedAt: Date;
    updatedBy: string;
    updatedAt: Date;
};
