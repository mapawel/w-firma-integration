import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/providers/app-status/use-app-status';
import { APIRoutes } from '@/routes/api';
import { UploadResDTO } from '@/views/Upload/Result/Upload-result.type';

export const submitUpladedData = async (uploadData: UploadResDTO) => {
    try {
        startLoading();

        const { data: responseData }: { data: any } = await axios.post(
            APIRoutes.UPLOAD_POST_PRODUCTS,
            uploadData.data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        stopLoading();

        return console.log('responseData ----> ', responseData);
    } catch (err: any) {
        stopLoading();

        if (err.response.status === 400)
            return setAppData({
                mainInfo: 'Coś nie tak z wysłanymi danymi. Wskazówki:',
                detailsArr: err.response.data.message,
            });
        setAppData({
            mainInfo: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
            detailsArr: [],
        });
    }
};
