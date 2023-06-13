import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/providers/app-status/use-app-status';
import { APIRoutes } from '@/routes/api';
import { UploadResDTO } from '@/views/Upload/Result/Upload-result.type';
import { BulkUploadResDTO } from '@/views/Upload/Result/types/bulk-upload-res.dto';

export const submitUpladProductdToDB = async (
    uploadData: UploadResDTO,
): Promise<BulkUploadResDTO | void> => {
    try {
        startLoading();

        const { data: responseData }: { data: BulkUploadResDTO } =
            await axios.post(APIRoutes.UPLOAD_PRODUCTS, uploadData.data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        stopLoading();
        return responseData;
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
