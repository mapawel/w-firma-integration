import { Status } from '@/domains/products/status/status.enum';
import { createContext, Dispatch, SetStateAction } from 'react';
import { SaleProductResDTO } from '@/domains/sale-and-sale-upload/dto/sale-products-res.dto';

export const SaleDataAndDataFiltersCtx = createContext<{
    data: SaleProductResDTO[];
    count: number;
    uniqueReservationIds: string[];
    filterStatus: Status | 'all';
    filterReservationId: string;
    handleSort: (param: keyof SaleProductResDTO) => void;
    sortParam: keyof SaleProductResDTO;
    sortDirect: 'ASC' | 'DESC';
    isDropdownOpen: boolean;
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
    buttonRef: React.RefObject<HTMLButtonElement> | null;
    setFilterStatus: Dispatch<SetStateAction<any>>;
    setFilterReservationId: Dispatch<SetStateAction<any>>;
    records: number;
    setRecords: Dispatch<SetStateAction<number>>;
    skip: number;
    setSkip: Dispatch<SetStateAction<number>>;
    mutate: () => void;
}>({
    data: [],
    count: 0,
    uniqueReservationIds: [],
    filterStatus: 'all',
    filterReservationId: 'all',
    handleSort: () => {},
    sortParam: 'addedAt',
    sortDirect: 'DESC',
    isDropdownOpen: false,
    setDropdownOpen: () => {},
    buttonRef: null,
    setFilterStatus: () => {},
    setFilterReservationId: () => {},
    records: 50,
    setRecords: () => {},
    skip: 0,
    setSkip: () => {},
    mutate: () => {},
});
