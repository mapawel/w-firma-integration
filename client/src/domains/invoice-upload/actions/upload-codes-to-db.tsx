import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/data-providers/app-status/use-app-status';
import { APIRoutes } from '@/navigation/routes/api.routes';
import { UploadCodesResDTO } from '@/ui/views/Upload-result/Upload-codes-result.type';

export const uploadCodesToDB = async (
    uploadData: UploadCodesResDTO,
): Promise<true | void> => {
    const timer = startLoading();

    try {
        const { data: responseData }: { data: true } = await axios.post(
            APIRoutes.UPLOAD_CODE_TRANSLATIONS,
            uploadData.data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        stopLoading(timer);
        return responseData;
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
