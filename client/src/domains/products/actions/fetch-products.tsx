import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/data-providers/app-status/use-app-status';
import { ProductQueryParams } from '../queries/product-query-params.type';
import { ResponseFromProductFetchDTO } from '../dto/response-from-product-fetch.dto';

export const fetchProducts = async (
    url: string,
    queryParams: ProductQueryParams,
) => {
    const timer = startLoading();
    
    try {
        const queryString = new URLSearchParams(queryParams).toString();

        const { data }: { data: ResponseFromProductFetchDTO } = await axios.get(
            `${url}?${queryString}`,
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
