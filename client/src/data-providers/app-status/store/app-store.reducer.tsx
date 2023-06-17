import {
    IState,
    IAction,
    ActionType,
} from '@/data-providers/app-status/store/interfaces';
import { initialState } from '@/data-providers/app-status/store/app-store-initial.state';

export function reducer(state: IState, { type, payload }: IAction): IState {
    switch (type) {
        case ActionType.LOADING:
            return { ...state, isLoading: true };
        case ActionType.LOADED:
            return { ...state, isLoading: false };
        case ActionType.SET_DATA:
            return {
                ...state,
                data: {
                    mainInfo: payload.mainInfo,
                    detailsArr: payload.detailsArr,
                    callbackClearInfo: payload.callbackClearInfo,
                },
            };
        case ActionType.CLEAN_DATA:
            return {
                ...state,
                data: initialState.data,
            };

        default:
            throw new Error('error indise reducer in useLoadingAndInfo');
    }
}
