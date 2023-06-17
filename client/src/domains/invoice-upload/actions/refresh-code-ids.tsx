import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/data-providers/app-status/use-app-status';
import { APIRoutes } from '@/navigation/routes/api.routes';

export const refreshCodeIds = async (): Promise<boolean | void> => {
    try {
        startLoading();

        const { data: responseData }: { data: boolean } = await axios.get(
            APIRoutes.REFRESH_CODE_IDS,
        );

        stopLoading();
        return responseData;
    } catch (err: any) {
        stopLoading();
        return setAppData({
            mainInfo: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
            detailsArr: [],
        });
    }
};
