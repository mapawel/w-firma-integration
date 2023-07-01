import { ProductResDTO } from '@/domains/products/dto/products-res.dto';
import { Status } from '@/domains/products/status/status.enum';
import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';

export const DataAndDataFiltersCtx = createContext<{
    data: ProductResDTO[];
    count: number;
    uniqueInvoices: string[];
    filterStatus: Status | 'all';
    filterInvoice: string;
    handleSort: (param: keyof ProductResDTO) => void;
    sortParam: keyof ProductResDTO;
    sortDirect: 'ASC' | 'DESC';
    isDropdownOpen: boolean;
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
    buttonRef: React.RefObject<HTMLButtonElement> | null;
    setFilterStatus: Dispatch<SetStateAction<any>>;
    setFilterInvoice: Dispatch<SetStateAction<any>>;
    records: number;
    setRecords: Dispatch<SetStateAction<number>>;
    skip: number;
    setSkip: Dispatch<SetStateAction<number>>;
    mutate: () => void;
}>({
    data: [],
    count: 0,
    uniqueInvoices: [],
    filterStatus: 'all',
    filterInvoice: 'all',
    handleSort: () => {},
    sortParam: 'addedAt',
    sortDirect: 'DESC',
    isDropdownOpen: false,
    setDropdownOpen: () => {},
    buttonRef: null,
    setFilterStatus: () => {},
    setFilterInvoice: () => {},
    records: 50,
    setRecords: () => {},
    skip: 0,
    setSkip: () => {},
    mutate: () => {},
});
