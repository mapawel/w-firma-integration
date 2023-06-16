import { Status } from '../status/status.enum';

export class ProductForInvoiceResDTO {
    id: number;
    productCode: string | undefined;
    supplierCode: string;
    quantity: number;
    netPrice: number;
    status: Status;
}
