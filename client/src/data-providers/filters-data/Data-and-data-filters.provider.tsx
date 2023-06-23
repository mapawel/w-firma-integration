import React, { FC, useEffect, useRef, useState } from 'react';
import { DataAndDataFiltersCtx } from './filters-data.context';
import { Status } from '@/domains/products/status/status.enum';
import { ProductResDTO } from '@/domains/products/dto/products-res.dto';
import { ProductQueryParams } from '@/domains/products/queries/product-query-params.type';
import { fetchProducts } from '@/domains/products/actions/fetch-products';
import useSWR, { SWRResponse } from 'swr';
import { APIRoutes } from '@/navigation/routes/api.routes';
import { ResponseFromProductFetchDTO } from '@/domains/products/dto/response-from-product-fetch.dto';

interface IProps {
    children: React.ReactNode;
}

export const DataAndDataFiltersProvider: FC<IProps> = ({ children }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [sortParam, setSortParam] = useState<keyof ProductResDTO>('addedAt');
    const [sortDirect, setSortDirect] = useState<'ASC' | 'DESC'>('DESC');
    const [records, setRecords] = useState<number>(50);
    const [skip, setSkip] = useState<number>(0);
    const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');
    const [filterInvoice, setFilterInvoice] = useState<string>('all');

    const queryParams: ProductQueryParams = {
        status: filterStatus,
        invoice: filterInvoice,
        sortParam,
        sortDirect,
        records: String(records),
        skip: String(skip),
    };

    const { data }: SWRResponse<ResponseFromProductFetchDTO | void> = useSWR(
        [APIRoutes.UPLOAD_OR_FETCH_PRODUCTS, queryParams],
        ([url, params]) => fetchProducts(url, params),
    );

    const handleSort = (param: keyof ProductResDTO) => {
        if (param === sortParam) {
            setSortDirect(sortDirect === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSortParam(param);
            setSortDirect('ASC');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            )
                setDropdownOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    useEffect(() => {
        setSkip(0);
    }, [filterStatus, filterInvoice, sortParam, sortDirect]);

    return (
        <DataAndDataFiltersCtx.Provider
            value={{
                data: data?.products || [],
                count: data?.totalProducts || 0,
                uniqueInvoices: data?.uniqueInvoiceNumbers || [],
                filterStatus,
                filterInvoice,
                handleSort,
                sortParam,
                sortDirect,
                isDropdownOpen,
                setDropdownOpen,
                buttonRef,
                setFilterStatus,
                setFilterInvoice,
                records,
                setRecords,
                skip,
                setSkip,
            }}
        >
            {children}
        </DataAndDataFiltersCtx.Provider>
    );
};
