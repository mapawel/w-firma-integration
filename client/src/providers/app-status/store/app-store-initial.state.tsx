import { IState } from '@/providers/app-status/store/interfaces';

export const initialState: IState = {
    isLoading: false,
    data: {
        mainInfo: null,
        detailsArr: [],
        callbackClearInfo: () => {},
    },
};
