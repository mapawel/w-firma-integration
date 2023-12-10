import { Status } from '../status/status.enum';

export class SaleProductResDTO {
    id: number;
    customerId: string;
    reservationId: string | undefined;
    supplierCode: string;
    productCode: string | undefined;
    quantity: number;
    netPrice: number;
    currency: string;
    status: Status;
    addedBy: string;
    addedAt: Date;
    updatedBy: string;
    updatedAt: Date;
}
