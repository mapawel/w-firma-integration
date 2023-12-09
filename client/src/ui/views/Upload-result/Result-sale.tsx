import { upladProductdToDB } from '@/domains/invoice-upload/actions/upload-products-to-db';
import { upladProductsForOrders } from '@/domains/order/actions/upload-product-for-orders';
import NavTemplate from '@/ui/components/templates/Nav-template';
import { ClientRoutes } from '@/navigation/routes/client.routes';
import { FC } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UploadProductsResDTO } from './Upload-prods-result.type';
import {
    cleanAppData,
    setAppData,
} from '@/data-providers/app-status/use-app-status';
import { BulkUploadResDTO } from '../../../domains/invoice-upload/types/bulk-upload-res.dto';
import { CreateOrderResDTO } from '../../../domains/order/dto/create-order-res.dto';
import { UploadResultInside } from '@/ui/components/organisms/Upload-result-inside';
import { buildFeedbackModalDetails } from './helpers/build-feedback-modal-details';
import { UploadTypeEnum } from '@/ui/views/Upload/data/Upload-type.enum';

const ResultSaleView: FC = () => {
    const navigate = useNavigate();
    const { state }: { state: { uploadResult: UploadProductsResDTO } } =
        useLocation();
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

        setAppData({
            mainInfo:
                'Pomyślnie dodano produkty pod rezerwację do bazy danych.',
            detailsArr: buildFeedbackModalDetails(responseData),
            callbackClearInfo: () => {
                cleanAppData();
                navigate(ClientRoutes.INVOICES, { replace: true });
            },
            callbackClearInfoLabel: 'Sprawdź w tabeli rezerwacji',
        });
    };

    const handleCreateOrders = async (): Promise<void> => {
        const responseData: BulkUploadResDTO | void = await upladProductdToDB({
            data,
            totalPositions,
            totalQty,
            totalValue,
        });
        if (!responseData) return;

        const createOrdersInfo: CreateOrderResDTO | void =
            await upladProductsForOrders(responseData.productIds, navigate);
        if (!createOrdersInfo) return;

        setAppData({
            mainInfo: 'Informacja o statusie dodawania rezerwacji do W-Firma:',
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
                    viewType={UploadTypeEnum.SALE}
                />
            </NavTemplate>
        </>
    );
};

export default ResultSaleView;
