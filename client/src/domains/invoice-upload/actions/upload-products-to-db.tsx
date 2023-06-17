import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/data-providers/app-status/use-app-status';
import { APIRoutes } from '@/navigation/routes/api.routes';
import { UploadResDTO } from '@/ui/views/Upload-result/Upload-result.type';
import { BulkUploadResDTO } from '@/domains/invoice-upload/types/bulk-upload-res.dto';

export const upladProductdToDB = async (
    uploadData: UploadResDTO,
): Promise<BulkUploadResDTO | void> => {
    try {
        startLoading();

        const { data: responseData }: { data: BulkUploadResDTO } =
            await axios.post(
                APIRoutes.UPLOAD_OR_FETCH_PRODUCTS,
                uploadData.data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
        stopLoading();
        return responseData;
    } catch (err: any) {
        stopLoading();

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
