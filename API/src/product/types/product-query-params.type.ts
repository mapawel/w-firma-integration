import { Supplier } from '../../supplier/supppliers.enum';
import { ProductResDTO } from '../dto/product-res.dto';
import { Status } from '../status/status.enum';

export type ProductQueryParams = {
    supplierCode: string;
    currency: string;
    supplier: Supplier;
    productCode: string;
    status: Status;
    invoice: string;
    sortParam: keyof ProductResDTO;
    sortDirect: 'ASC' | 'DESC';
    records: number;
    skip: number;
};
