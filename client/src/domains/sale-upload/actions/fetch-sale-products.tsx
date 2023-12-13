import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/data-providers/app-status/use-app-status';
import { ResponseFromSaleProductFetchDto } from '@/domains/sale-upload/dto/response-from-sale-product-fetch.dto';
import { SaleProductQueryParams } from '@/domains/sale-upload/queries/sale-product-query-params.type';

export const fetchSaleProducts = async (
    url: string,
    queryParams: SaleProductQueryParams,
) => {
    const timer = startLoading();

    try {
        const queryString = new URLSearchParams(queryParams).toString();

        const { data }: { data: ResponseFromSaleProductFetchDto } =
            await axios.get(`${url}?${queryString}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        stopLoading(timer);

        return data;
    } catch (err: any) {
        stopLoading(timer);

        if (err.response.status === 403)
            return setAppData({
                mainInfo: 'Nie masz dpstępu do tych danych lub tej czynności!',
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
