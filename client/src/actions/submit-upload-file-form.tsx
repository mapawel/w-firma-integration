import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/providers/app-status/use-app-status';
import { Input } from '@/views/Upload/Input.enum';
import { APIRoutes } from '@/routes/api';
import { ClientRoutes } from '@/routes/client';
import { NavigateFunction } from 'react-router-dom';
import { UploadResDTO } from '@/views/Upload/Result/Upload-result.type';

export const submitUpladFileForm = async (
    formRef: React.RefObject<HTMLFormElement>,
    navigate: NavigateFunction,
) => {
    try {
        startLoading();
        if (!formRef.current) {
            stopLoading();
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
        stopLoading();

        return navigate(ClientRoutes.UPLOAD_RESULT, {
            state: {
                uploadResult: data,
            },
        });
    } catch (err: any) {
        formRef.current?.reset();
        stopLoading();

        if (err.response.status === 400)
            return setAppData({
                mainInfo:
                    'Coś nie tak z plikiem lub ustawieniami jak plik ma być czytany. Wskazówki:',
                detailsArr: err.response.data.message,
            });
        setAppData({
            mainInfo: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
            detailsArr: [],
        });
    }
};
