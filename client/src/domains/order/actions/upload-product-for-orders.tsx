import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/data-providers/app-status/use-app-status';
import { APIRoutes } from '@/navigation/routes/api.routes';
import { CreateOrderResDTO } from '@/domains/order/types/create-order-res.dto';

export const upladProductsForOrders = async (
    productIds: number[],
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
            });
        if (err.response.status === 400)
            return setAppData({
                mainInfo: 'Coś nie tak z wysłanymi danymi. Wskazówki:',
                detailsArr: err.response.data.message,
            });
        return setAppData({
            mainInfo: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
            detailsArr: [],
        });
    }
};
