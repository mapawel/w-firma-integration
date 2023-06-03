import { Supplier } from '../../supplier/supppliers.enum';
import { ProductResDTO } from '../dto/product-res.dto';

export type ProductQueryParams = {
    supplierCode: string;
    currency: string;
    supplier: Supplier;
    sortParam: keyof ProductResDTO;
    sortDirect: 'ASC' | 'DESC';
    records: number;
    skip: number;
};
