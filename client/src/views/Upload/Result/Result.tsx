import { upladProductdToDB } from '@/actions/upload-products-to-db';
import { upladProductsForOrders } from '@/actions/upload-product-for-orders';
import NavTemplate from '@/components/templates/Nav-template';
import { ClientRoutes } from '@/routes/client';
import { FC } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UploadResDTO } from './Upload-result.type';
import {
    cleanAppData,
    setAppData,
} from '@/providers/app-status/use-app-status';
import { setAppDataAsDBUpload } from './helpers/set-app-data-db-upload';
import { BulkUploadResDTO } from './types/bulk-upload-res.dto';
import { CreateOrderResDTO } from './types/create-order-res.dto';
import { UploadResultInside } from '@/components/organisms/Upload-result-inside';

const ResultView: FC = () => {
    const navigate = useNavigate();
    const { state }: { state: { uploadResult: UploadResDTO } } = useLocation();
    const {
        uploadResult: {
            data = [],
            totalPositions = 0,
            totalQty = 0,
            totalValue = 0,
        } = {},
    } = state || {};

    const handleSaveToDB = async (): Promise<void> => {
        const responseData: BulkUploadResDTO | void = await upladProductdToDB({
            data,
            totalPositions,
            totalQty,
            totalValue,
        });

        if (!responseData) return;
        setAppDataAsDBUpload(
            'Pomyślnie dodano produkty do bazy danych.',
            responseData,
            navigate,
        );
    };

    const handleCreateOrders = async (): Promise<void> => {
        const responseData: BulkUploadResDTO | void = await upladProductdToDB({
            data,
            totalPositions,
            totalQty,
            totalValue,
        });

        if (!responseData) return;
        if (!responseData.canAutoProceed) {
            return setAppDataAsDBUpload(
                'Produkty dodano do bazy danych, ale napotkanu problemy. Nie można było od razu stworzyć zamówień w W-Firma.',
                responseData,
                navigate,
            );
        }

        const createOrdersInfo: CreateOrderResDTO | void =
            await upladProductsForOrders(responseData.productIds);
        if (!createOrdersInfo) return;
        setAppData({
            mainInfo: 'Informacja o statusie dodawania zamówień do W-Firma:',
            detailsArr: createOrdersInfo.info,
            callbackClearInfo: () => {
                cleanAppData();
                navigate('/', { replace: true });
            },
            callbackClearInfoLabel: 'Wróć do strony głównej',
        });
    };

    const handleCancel = (): void =>
        navigate(ClientRoutes.UPLOAD, { replace: true });

    return (
        <>
            {!state && <Navigate to="/upload" replace={true} />}

            <NavTemplate>
                <UploadResultInside
                    uploadResult={state.uploadResult}
                    handleCancel={handleCancel}
                    handleCreateOrders={handleCreateOrders}
                    handleSaveToDB={handleSaveToDB}
                />
            </NavTemplate>
        </>
    );
};

export default ResultView;
