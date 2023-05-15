import { useReducer, useEffect, useCallback } from 'react';
import {
    startLoading,
    stopLoading,
    setAppError,
} from '@/providers/app-status/use-app-status';
import axios from 'axios';

export interface IUser {
    name: string | null;
    roles: string[];
}

export interface IState {
    user: IUser | null;
}

enum ActionType {
    SETUSER = 'setUser',
}

interface IAction {
    type: ActionType;
    payload: IUser | null;
}

interface IStore {
    isReady: boolean;
    dispatch: (action: IAction) => void;
}

const store: IStore = {
    isReady: false,
    dispatch: () => {},
};

const initialState: IState = {
    user: null,
};

function reducer(state: IState, { type, payload }: IAction): IState {
    switch (type) {
        case ActionType.SETUSER:
            return { ...state, user: payload };
        default:
            throw new Error('error indise reducer in useLoadingAndInfo');
    }
}

const useAuth = () => {
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

export const useFetchUser = () => {
    const { user }: IState = useAuth();

    const fetchUser = useCallback(async (): Promise<IUser | null> => {
        try {
            startLoading();
            const { data }: { data: IUser } = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/user`,
            );

            stopLoading();
            return data;
        } catch {
            stopLoading();
            setAppError({
                mainError: "Couldn't fetch user!",
                detailsArr: [],
            });
            return null;
        }
    }, []);

    useEffect(() => {
        const initFetch = async () => {
            const fetchedUser: IUser | null = await fetchUser();
            setuser(fetchedUser);
        };
        if (!user?.name) initFetch();
    }, [fetchUser, user?.name]);

    return true;
};

export const setuser = (user: IUser | null) =>
    store.dispatch({ type: ActionType.SETUSER, payload: user });

export default useAuth;
