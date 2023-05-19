import { useReducer, useEffect } from 'react';
import { IData } from '@/providers/app-status/interfaces';
import {
    IState,
    IAction,
    ActionType,
} from '@/providers/app-status/store/interfaces';
import { store } from '@/providers/app-status/store/app-status-store';
import { reducer } from '@/providers/app-status/store/app-store.reducer';
import { initialState } from '@/providers/app-status/store/app-store-initial.state';

const useAppStatus = () => {
    const [state, dispatch] = useReducer<
        (state: IState, action: IAction) => IState
    >(reducer, initialState);

    useEffect(() => {
        if (!store.isReady) {
            store.isReady = true;
            store.dispatch = (action: IAction) => dispatch(action);
        }
        return () => {
            store.isReady = false;
        };
    }, [dispatch]);

    return state;
};

export const startLoading = () =>
    setTimeout(() => store.dispatch({ type: ActionType.LOADING }));

export const stopLoading = (timer?: any) => {
    if (timer) clearInterval(timer);
    store.dispatch({ type: ActionType.LOADED });
};

export const setAppData = (data: IData) => {
    store.dispatch({
        type: ActionType.SET_DATA,
        payload: data,
    });
};

export const cleanAppData = () => {
    store.dispatch({
        type: ActionType.CLEAN_DATA,
    });
};

export default useAppStatus;
