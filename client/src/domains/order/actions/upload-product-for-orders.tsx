import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
    cleanAppData,
} from '@/data-providers/app-status/use-app-status';
import { APIRoutes } from '@/navigation/routes/api.routes';
import { CreateOrderResDTO } from '@/domains/order/dto/create-order-res.dto';
import { NavigateFunction } from 'react-router-dom';
import { ClientRoutes } from '@/navigation/routes/client.routes';

const redirect = (navigate: NavigateFunction) => {
    cleanAppData();
    navigate(ClientRoutes.INVOICES, { replace: true });
};

export const upladProductsForOrders = async (
    productIds: number[],
    navigate: NavigateFunction,
): Promise<CreateOrderResDTO | void> => {
    const timer = startLoading();

    try {
        const { data: responseData }: { data: CreateOrderResDTO } =
            await axios.post(APIRoutes.UPLOAD_ORDERS, productIds, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        stopLoading(timer);
        return responseData;
    } catch (err: any) {
        stopLoading(timer);

        if (err.response.status === 408)
            return setAppData({
                mainInfo: `Coś nie tak z połączeniem do W-Firma. Wskazówka: ${err.response.data.message}`,
                detailsArr: [],
                callbackClearInfo: () => redirect(navigate),
                callbackClearInfoLabel: 'Sprawdź w tabeli',
            });
        if (err.response.status === 400)
            return setAppData({
                mainInfo: 'Coś nie tak z wysłanymi danymi. Wskazówki:',
                detailsArr: err.response.data.message,
                callbackClearInfo: () => redirect(navigate),
                callbackClearInfoLabel: 'Sprawdź w tabeli',
            });
        return setAppData({
            mainInfo: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
            detailsArr: [],
            callbackClearInfo: () => redirect(navigate),
            callbackClearInfoLabel: 'Sprawdź w tabeli',
        });
    }
};
