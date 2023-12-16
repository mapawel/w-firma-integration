import React, { FC, useEffect, useRef, useState } from 'react';
import { Status } from '@/domains/products/status/status.enum';
import useSWR, { SWRResponse } from 'swr';
import { APIRoutes } from '@/navigation/routes/api.routes';
import { fetchSaleProducts } from '@/domains/sale-and-sale-upload/actions/fetch-sale-products';
import { ResponseFromSaleProductFetchDto } from '@/domains/sale-and-sale-upload/dto/response-from-sale-product-fetch.dto';
import { SaleProductResDTO } from '@/domains/sale-and-sale-upload/dto/sale-products-res.dto';
import { SaleDataAndDataFiltersCtx } from '@/data-providers/filters-data-sale/filters-sale-data.context';
import { SaleProductQueryParams } from '@/domains/sale-and-sale-upload/queries/sale-product-query-params.type';

interface IProps {
    children: React.ReactNode;
}

export const SaleDataAndDataFiltersProvider: FC<IProps> = ({ children }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [sortParam, setSortParam] =
        useState<keyof SaleProductResDTO>('addedAt');
    const [sortDirect, setSortDirect] = useState<'ASC' | 'DESC'>('DESC');
    const [records, setRecords] = useState<number>(50);
    const [skip, setSkip] = useState<number>(0);
    const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');
    const [filterReservationId, setFilterReservationId] =
        useState<string>('all');

    const queryParams: SaleProductQueryParams = {
        status: filterStatus,
        reservationId: filterReservationId,
        sortParam,
        sortDirect,
        records: String(records),
        skip: String(skip),
    };

    const {
        data,
        mutate,
    }: SWRResponse<ResponseFromSaleProductFetchDto | void> = useSWR(
        [APIRoutes.UPLOAD_FETCH_DELETE_SALEPRODUCTS, queryParams],
        ([url, params]) => fetchSaleProducts(url, params),
    );

    const handleSort = (param: keyof SaleProductResDTO) => {
        if (param === sortParam) {
            setSortDirect(sortDirect === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSortParam(param);
            setSortDirect('ASC');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isDropdownOpen && event.target !== buttonRef.current)
                setDropdownOpen(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    useEffect(() => {
        setSkip(0);
    }, [filterStatus, filterReservationId, sortParam, sortDirect]);

    return (
        <SaleDataAndDataFiltersCtx.Provider
            value={{
                data: data?.saleProducts || [],
                count: data?.totalSaleProducts || 0,
                uniqueReservationIds: data?.uniqueReservationIds || [],
                filterStatus,
                filterReservationId,
                handleSort,
                sortParam,
                sortDirect,
                isDropdownOpen,
                setDropdownOpen,
                buttonRef,
                setFilterStatus,
                setFilterReservationId,
                records,
                setRecords,
                skip,
                setSkip,
                mutate,
            }}
        >
            {children}
        </SaleDataAndDataFiltersCtx.Provider>
    );
};
