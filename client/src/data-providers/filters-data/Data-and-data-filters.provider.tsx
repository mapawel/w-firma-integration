import React, { FC, useEffect, useRef, useState } from 'react';
import { DataAndDataFiltersCtx } from './filters-data.context';
import { Status } from '@/domains/products/status/status.enum';
import { ProductResDTO } from '@/domains/products/dto/products-res.dto';
import { ProductQueryParams } from '@/domains/products/queries/product-query-params.type';
import { fetchProducts } from '@/domains/products/actions/fetch-products';
import useSWR, { SWRResponse } from 'swr';
import { APIRoutes } from '@/navigation/routes/api.routes';
import { ResponseFromProductFetchDTO } from '@/domains/products/dto/response-from-product-fetch.dto';
import { Supplier } from '@/domains/supplier/supppliers.enum';

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
    const [filterStatus, setFilterStatus] = useState(Status.all);
    const [filterInvoice, setFilterInvoice] = useState('all');

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

var mock: {
    totalProducts: number;
    uniqueInvoiceNumbers: string[];
    products: ProductResDTO[];
} = {
    products: [
        {
            id: 13181,
            supplierCode: 'ERCAN8286B00600',
            productCode: '8286B006',
            quantity: 1,
            netPrice: 33.04,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13177,
            supplierCode: 'ERCAN4192C00800',
            productCode: '4192C008',
            quantity: 1,
            netPrice: 119.19,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.SUCCESS,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13180,
            supplierCode: 'ERCAN5224B00700',
            productCode: '5224B007',
            quantity: 1,
            netPrice: 37.03,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW_WARN,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13179,
            supplierCode: 'ERCAN5224B00500',
            productCode: '5224B005',
            quantity: 1,
            netPrice: 37.15,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13178,
            supplierCode: 'ERCAN5224B00100',
            productCode: '5224B001',
            quantity: 1,
            netPrice: 17.5,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.ERROR,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13175,
            supplierCode: 'ERCAN3402C00100',
            productCode: '3402C001',
            quantity: 400,
            netPrice: 4.99,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13176,
            supplierCode: 'ERCAN3713C00600',
            productCode: '3713C006',
            quantity: 500,
            netPrice: 29.21,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13174,
            supplierCode: 'ERCAN3401C00100',
            productCode: '3401C001',
            quantity: 500,
            netPrice: 4.99,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13172,
            supplierCode: 'ERCAN3385C00100',
            productCode: '3385C001',
            quantity: 8,
            netPrice: 7.18,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13173,
            supplierCode: 'ERCAN3400C00100',
            productCode: '3400C001',
            quantity: 500,
            netPrice: 4.99,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13171,
            supplierCode: 'ERCAN1509B01200',
            productCode: '1509B012',
            quantity: 2,
            netPrice: 13.69,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13169,
            supplierCode: 'ERCAN0332C00500',
            productCode: '0332C005',
            quantity: 960,
            netPrice: 46.84,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13170,
            supplierCode: 'ERCAN0386C00600',
            productCode: '0386C006',
            quantity: 10200,
            netPrice: 37,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13166,
            supplierCode: 'ETCANG71900',
            productCode: '3480B002',
            quantity: 12,
            netPrice: 108.56,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13168,
            supplierCode: 'ETCANG72405',
            productCode: '3482B002',
            quantity: 2,
            netPrice: 160.52,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13167,
            supplierCode: 'ETCANG71905',
            productCode: '3479B002',
            quantity: 400,
            netPrice: 60.44,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13165,
            supplierCode: 'ETCANG71815',
            productCode: '2659B002',
            quantity: 5,
            netPrice: 85.95,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13163,
            supplierCode: 'ETCANG71805',
            productCode: '2660B002',
            quantity: 10,
            netPrice: 85.95,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13164,
            supplierCode: 'ETCANG71810',
            productCode: '2661B002',
            quantity: 10,
            netPrice: 85.95,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13162,
            supplierCode: 'ETCANG71800',
            productCode: '2662B002',
            quantity: 10,
            netPrice: 86.85,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13160,
            supplierCode: 'ETCANEP7293',
            productCode: '4367B002',
            quantity: 1,
            netPrice: 40.74,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13161,
            supplierCode: 'ETCANG70715',
            productCode: '9422A004',
            quantity: 10,
            netPrice: 62.41,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13159,
            supplierCode: 'ETCANEP7292',
            productCode: '4369B002',
            quantity: 1,
            netPrice: 40.74,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13155,
            supplierCode: 'ETCANEP7162',
            productCode: '1977B002',
            quantity: 500,
            netPrice: 50.23,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
        {
            id: 13156,
            supplierCode: 'ETCANEP7163',
            productCode: '1980B002',
            quantity: 1,
            netPrice: 54.14,
            currency: 'PLN',
            invoice: 'A1556102',
            supplier: Supplier.AB,
            status: Status.NEW,
            addedBy: 'exampleUserId',
            addedAt: new Date(),
            updatedBy: '',
            updatedAt: new Date(),
        },
    ],
    totalProducts: 188,
    uniqueInvoiceNumbers: ['A1556102'],
};
