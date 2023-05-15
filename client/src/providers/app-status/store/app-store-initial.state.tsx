import { IState } from '@/providers/app-status/store/interfaces';

export const initialState: IState = {
    isLoading: false,
    info: {
        mainInfo: null,
        detailsArr: [],
        callbackClearInfo: () => {},
    },
    error: {
        mainError: null,
        detailsArr: [],
        callbackClearError: () => {},
    },
};
