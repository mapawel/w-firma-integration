import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/data-providers/app-status/use-app-status';

export const refreshCodeIds = async (
    route: string,
): Promise<boolean | void> => {
    const timer = startLoading();

    try {
        const { data: responseData }: { data: boolean } = await axios.get(
            route,
        );

        stopLoading(timer);
        return responseData;
    } catch (err: any) {
        stopLoading(timer);
        return setAppData({
            mainInfo: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
            detailsArr: [],
        });
    }
};
