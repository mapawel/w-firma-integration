import { FC } from 'react';
import NavTemplate from '@/components/templates/Nav-template';
import { ProductType } from './Product.type';
import ProductTable from '@/components/organisms/Product-table';
import { useLocation, Navigate } from 'react-router-dom';
import { UploadResDTO } from './Upload-result.type';

const mockData: ProductType[] = [
    {
        id: 1,
        supplierIndex: 'AK4WOK00137',
        quantity: 1,
        netPrice: 111.56,
        currency: 'EUR',
        invoiceNumber: 'A1556815',
    },
    {
        id: 2,
        supplierIndex: 'SFSAMMDG6400004',
        quantity: 2,
        netPrice: 11,
        currency: 'EUR',
        invoiceNumber: 'A1556815',
    },
    {
        id: 3,
        supplierIndex: 'SFSAMMDG6400004',
        quantity: 1000,
        netPrice: 100,
        currency: 'EUR',
        invoiceNumber: 'A1556815',
    },
    {
        id: 4,
        supplierIndex: 'SFSAMMDG6400004',
        quantity: 500,
        netPrice: 50.5,
        currency: 'EUR',
        invoiceNumber: 'A1556815',
    },
];

const ResultView: FC = () => {
    const { state }: { state: { uploadResult: UploadResDTO } } = useLocation();
    return (
        <>
            {!state?.uploadResult && <Navigate to="/upload" replace={true} />}
            <NavTemplate>
                <h1 className="text-2xl font-semibold">
                    {state?.uploadResult.totalPositions}
                </h1>
                <h1 className="text-2xl font-semibold">
                    {state?.uploadResult.totalQty}
                </h1>
                <h1 className="text-2xl font-semibold">
                    {state?.uploadResult.totalValue}
                </h1>
                <ProductTable data={state?.uploadResult.data} />
            </NavTemplate>
        </>
    );
};

export default ResultView;
