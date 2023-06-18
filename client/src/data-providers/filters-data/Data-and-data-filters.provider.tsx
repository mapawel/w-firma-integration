import React, { FC, useEffect, useRef, useState } from 'react';
import { DataAndDataFiltersCtx } from './filters-data.condext';
import { Status } from '@/domains/products/status/status.enum';
import { ProductResDTO } from '@/domains/products/dto/product-res.dto';
import { ProductQueryParams } from '@/domains/products/queries/product-query-params.type';
import { fetchProducts } from '@/domains/products/actions/fetch-products';
import useSWR from 'swr';
import { APIRoutes } from '@/navigation/routes/api.routes';

interface IProps {
    children: React.ReactNode;
}

export const DataAndDataFiltersProvider: FC<IProps> = ({ children }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [sortParam, setSortParam] = useState<keyof ProductResDTO>('addedAt');
    const [sortDirect, setSortDirect] = useState<'ASC' | 'DESC'>('DESC');
    const [filterStatus, setFilterStatus] = useState(Status.all);
    const [filterInvoice, setFilterInvoice] = useState('all');
    const handlers = {
        setFilterStatus,
        setFilterInvoice,
    };

    const queryParams: ProductQueryParams = {
        status: filterStatus,
        sortParam,
        sortDirect,
        records: '50',
    };

    const { data }: { data: ProductResDTO[] } = useSWR(
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

    return (
        <DataAndDataFiltersCtx.Provider
            value={{
                data,
                filterStatus,
                filterInvoice,
                handleSort,
                sortParam,
                sortDirect,
                isDropdownOpen,
                setDropdownOpen,
                buttonRef,
                handlers,
            }}
        >
            {children}
        </DataAndDataFiltersCtx.Provider>
    );
};
