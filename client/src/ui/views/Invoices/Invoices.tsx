import { FC } from 'react';
import NavTemplate from '@/ui/components/templates/Nav-template';
import useSWR from 'swr';
import { fetchProducts } from '@/domains/products/actions/fetch-products';
import { APIRoutes } from '@/navigation/routes/api.routes';
import { ProductQueryParams } from '@/domains/products/queries/product-query-params.type';

const InvoicesView: FC = () => {
    const queryParams: ProductQueryParams = {
        sortParam: 'addedAt',
        sortDirect: 'DESC',
        records: '10',
    };

    const { data, error, isLoading } = useSWR(
        APIRoutes.UPLOAD_OR_FETCH_PRODUCTS,
        (url) => fetchProducts(url, queryParams),
    );
    
    return (
        <NavTemplate>
            {(() => {
                console.log('data ----> ', data);
                console.log('error ----> ', error);
                console.log('isLoading ----> ', isLoading);
                return <></>;
            })()}
            <h1>Invoices view</h1>
        </NavTemplate>
    );
};

export default InvoicesView;
