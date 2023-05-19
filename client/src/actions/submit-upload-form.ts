import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/providers/app-status/use-app-status';
import { Input } from '@/views/Load/Input.enum';

export const submitUpladForm = async (f: React.RefObject<HTMLFormElement>) => {
    try {
        startLoading();
        if (!f.current)
            return setAppData({
                mainInfo: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
                detailsArr: [],
            });

        const form: FormData = new FormData(f.current);
        if (!form.get(Input.FILE) || !form.get(Input.SUPPLIER))
            return setAppData({
                mainInfo: 'Nie wybrano pliku lub dostawcy.',
                detailsArr: [],
            });
        const r = await axios.post('/api/upload', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        stopLoading();

        f.current.reset();
        console.log('r ----> ', r);
    } catch (err: any) {
        f.current?.reset();
        stopLoading();
        if (err.response.status === 400)
            return setAppData({
                mainInfo:
                    'Coś nie tak z plikiem lub ustawieniami, w jaki sposób plik ma być czytany. Wskazówki:',
                detailsArr: err.response.data.message,
            });
        setAppData({
            mainInfo: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
            detailsArr: [],
        });
    }
};
