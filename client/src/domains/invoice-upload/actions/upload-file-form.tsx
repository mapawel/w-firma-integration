import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/data-providers/app-status/use-app-status';
import { Input } from '@/ui/views/Upload/Input.enum';
import { APIRoutes } from '@/navigation/routes/api.routes';
import { ClientRoutes } from '@/navigation/routes/client.routes';
import { NavigateFunction } from 'react-router-dom';
import { UploadResDTO } from '@/ui/views/Upload-result/Upload-result.type';

export const upladFileForm = async (
    formRef: React.RefObject<HTMLFormElement>,
    navigate: NavigateFunction,
) => {
    const timer = startLoading();

    try {
        if (!formRef.current) {
            stopLoading(timer);
            return setAppData({
                mainInfo: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
                detailsArr: [],
            });
        }

        const form: FormData = new FormData(formRef.current);
        if (!form.get(Input.FILE) || !form.get(Input.SUPPLIER))
            return setAppData({
                mainInfo: 'Nie wybrano pliku lub dostawcy.',
                detailsArr: [],
            });

        const { data }: { data: UploadResDTO } = await axios.post(
            APIRoutes.UPLOAD_FILE,
            form,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        formRef.current.reset();
        stopLoading(timer);

        return navigate(ClientRoutes.UPLOAD_RESULT, {
            state: {
                uploadResult: data,
            },
        });
    } catch (err: any) {
        formRef.current?.reset();
        stopLoading(timer);

        if (err.response.status === 400)
            return setAppData({
                mainInfo:
                    'Coś nie tak z plikiem lub ustawieniami jak plik ma być czytany. Wskazówki:',
                detailsArr: err.response.data.message,
            });
        return setAppData({
            mainInfo: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
            detailsArr: [],
        });
    }
};
