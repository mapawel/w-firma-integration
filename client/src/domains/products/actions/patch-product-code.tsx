import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/data-providers/app-status/use-app-status';
import { APIRoutes } from '@/navigation/routes/api.routes';

export const patchProductCode = async (
    route: APIRoutes,
    productId: number,
    productCode: string,
) => {
    const timer = startLoading();

    try {
        const { data }: { data: any } = await axios.patch(
            route,
            {
                productId,
                productCode,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        stopLoading(timer);

        return data;
    } catch (err: any) {
        stopLoading(timer);

        if (err.response.status === 404)
            return setAppData({
                mainInfo: err.response.data.message,
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
