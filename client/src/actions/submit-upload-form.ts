import axios from 'axios';
import {
    setAppError,
    startLoading,
    stopLoading,
} from '@/providers/app-status/use-app-status';
import { Input } from '@/views/Load/Input.enum';

export const submitUpladForm = async (f: React.RefObject<HTMLFormElement>) => {
    try {
        startLoading();
        if (!f.current)
            return setAppError({
                mainError: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
                detailsArr: [],
            });

        const form: FormData = new FormData(f.current);
        if (!form.get(Input.FILE) || !form.get(Input.SUPPLIER))
            return setAppError({
                mainError: 'Nie wybrano pliku lub dostawcy.',
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
        console.log('err ----> ', err);
        stopLoading();
        setAppError({
            mainError: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
            detailsArr: [err.message],
        });
    }
};
