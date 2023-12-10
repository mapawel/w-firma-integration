import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/data-providers/app-status/use-app-status';
import { APIRoutes } from '@/navigation/routes/api.routes';
import { BulkSaleUploadResDTO } from '@/domains/sale-upload/types/bulk-sale-upload-res.dto';
import { UploadSaleResDTO } from '@/ui/views/Upload-result/Upload-sale-result.type';

export const uploadSaleProductToDB = async (
    uploadData: UploadSaleResDTO,
): Promise<BulkSaleUploadResDTO | void> => {
    const timer = startLoading();

    try {
        const { data: responseData }: { data: BulkSaleUploadResDTO } =
            await axios.post(
                APIRoutes.UPLOAD_FETCH_DELETE_SALEPRODUCTS,
                { productsArray: uploadData.data },
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
