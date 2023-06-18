import { ProductResDTO } from '@/domains/products/dto/product-res.dto';
import { Status } from '@/domains/products/status/status.enum';
import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';

export const DataAndDataFiltersCtx = createContext<{
    data: ProductResDTO[];
    filterStatus: Status;
    filterInvoice: string;
    handleSort: (param: keyof ProductResDTO) => void;
    sortParam: keyof ProductResDTO;
    sortDirect: 'ASC' | 'DESC';
    isDropdownOpen: boolean;
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
    buttonRef: React.RefObject<HTMLButtonElement> | null;
    handlers: Record<string, Dispatch<SetStateAction<any>>>;
}>({
    data: [],
    filterStatus: Status.all,
    filterInvoice: 'all',
    handleSort: () => {},
    sortParam: 'addedAt',
    sortDirect: 'DESC',
    isDropdownOpen: false,
    setDropdownOpen: () => {},
    buttonRef: null,
    handlers: {
        setFilterStatus: () => {},
        setFilterInvoice: () => {},
    },
});
