import {
    IState,
    IAction,
    ActionType,
} from '@/providers/app-status/store/interfaces';
import { initialState } from '@/providers/app-status/store/app-store-initial.state';

export function reducer(state: IState, { type, payload }: IAction): IState {
    switch (type) {
        case ActionType.LOADING:
            return { ...state, isLoading: true };
        case ActionType.LOADED:
            return { ...state, isLoading: false };
        case ActionType.SET_INFO:
            return {
                ...state,
                info: {
                    mainInfo: payload.mainInfo,
                    detailsArr: payload.detailsArr,
                    callbackClearInfo: payload.callbackClearInfo,
                },
            };
        case ActionType.CLEAN_INFO:
            return {
                ...state,
                info: initialState.info,
            };
        case ActionType.SET_ERROR:
            return {
                ...state,
                error: {
                    mainError: payload?.mainError,
                    detailsArr: payload.detailsArr,
                    callbackClearError: payload?.callbackClearError,
                },
            };
        case ActionType.CLEAN_ERROR:
            return {
                ...state,
                error: initialState.error,
            };
        default:
            throw new Error('error indise reducer in useLoadingAndInfo');
    }
}
