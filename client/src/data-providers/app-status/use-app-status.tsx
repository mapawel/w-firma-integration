import { useReducer, useEffect } from 'react';
import { Data } from '@/data-providers/app-status/types/data.type';
import {
    IState,
    IAction,
    ActionType,
} from '@/data-providers/app-status/store/interfaces';
import { store } from '@/data-providers/app-status/store/app-status-store';
import { reducer } from '@/data-providers/app-status/store/app-store.reducer';
import { initialState } from '@/data-providers/app-status/store/app-store-initial.state';

const delayTimerMs = 300;

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
    setTimeout(
        () => store.dispatch({ type: ActionType.LOADING }),
        delayTimerMs,
    );

export const stopLoading = (timer?: any) => {
    if (timer) clearTimeout(timer);
    store.dispatch({ type: ActionType.LOADED });
};

export const setAppData = (data: Data) => {
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
