import { Supplier } from '../../supplier/supppliers.enum';

export type CodeTranslationParams = {
    supplierCode: string;
    supplier: Supplier;
    PN: string;
    sortParam: string;
    sortDirect: 'ASC' | 'DESC';
    records: number;
    skip: number;
};
