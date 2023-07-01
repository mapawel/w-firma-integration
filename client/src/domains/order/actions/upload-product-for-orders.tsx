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

export const upladProductsForOrders = async (
    productIds: number[],
    navigate: NavigateFunction,
): Promise<CreateOrderResDTO | void> => {
    try {
        startLoading();

        const { data: responseData }: { data: CreateOrderResDTO } =
            await axios.post(APIRoutes.UPLOAD_ORDERS, productIds, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        stopLoading();
        return responseData;
    } catch (err: any) {
        stopLoading();

        if (err.response.status === 408)
            return setAppData({
                mainInfo: `Coś nie tak z połączeniem do W-Firma. Wskazówka: ${err.response.data.message}`,
                detailsArr: [],
                callbackClearInfo: () => {
                    cleanAppData();
                    navigate('/', { replace: true });
                },
                callbackClearInfoLabel: 'Wróć do strony głównej',
            });
        if (err.response.status === 400)
            return setAppData({
                mainInfo: 'Coś nie tak z wysłanymi danymi. Wskazówki:',
                detailsArr: err.response.data.message,
                callbackClearInfo: () => {
                    cleanAppData();
                    navigate('/', { replace: true });
                },
                callbackClearInfoLabel: 'Wróć do strony głównej',
            });
        return setAppData({
            mainInfo: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
            detailsArr: [],
            callbackClearInfo: () => {
                cleanAppData();
                navigate('/', { replace: true });
            },
            callbackClearInfoLabel: 'Wróć do strony głównej',
        });
    }
};
