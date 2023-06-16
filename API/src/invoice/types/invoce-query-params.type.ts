import { Supplier } from '../../supplier/supppliers.enum';
import { InvoiceResDTO } from '../dto/invoice-res.dto';

export type InvoiceQueryParams = {
    number: string;
    supplier: Supplier;
    sortParam: keyof InvoiceResDTO;
    sortDirect: 'ASC' | 'DESC';
    records: number;
    skip: number;
};
