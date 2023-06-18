import { Supplier } from '@/domains/supplier/supppliers.enum';
import { ProductResDTO } from '../dto/products-res.dto';
import { Status } from '../status/status.enum';

export type ProductQueryParams = {
    supplierCode?: string;
    productCode?: string;
    currency?: string;
    supplier?: Supplier;
    status?: Status;
    invoice?: string;
    sortParam?: keyof ProductResDTO;
    sortDirect?: 'ASC' | 'DESC';
    records?: string;
    skip?: string;
    addedAt?: string;
};
