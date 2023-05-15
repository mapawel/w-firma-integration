import { useReducer, useEffect, Dispatch, FC } from 'react';
import { Portal } from 'react-portal';

interface IInfo {
    mainInfo: string | null;
    detailsArr: string[];
    callbackClearInfo: () => void;
}

interface IError {
    mainError: string | null;
    detailsArr: string[];
    callbackClearError?: () => void;
}

interface IState {
    isLoading: boolean;
    info: IInfo;
    error: IError;
}

enum ActionType {
    LOADING = 'loading',
    LOADED = 'loaded',
    SET_INFO = 'setInfo',
    CLEAN_INFO = 'cleanInfo',
    SET_ERROR = 'setError',
    CLEAN_ERROR = 'cleanError',
}

interface IAction {
    type: ActionType;
    payload?: any;
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

function reducer(state: IState, { type, payload }: IAction): IState {
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

interface IProps {
    children: React.ReactNode;
}

export const ProvideAppStatus: FC<IProps> = ({ children }) => {
    const { isLoading, info, error } = useAppStatus();

    return (
        <>
            {children}
            {isLoading ? (
                <Portal>
                    <div>
                        <h1>loading...</h1>
                    </div>
                </Portal>
            ) : null}
            {info?.mainInfo && (
                <Portal>
                    <div>
                        <p>{info.mainInfo}</p>
                        <p>{info.detailsArr}</p>
                    </div>
                </Portal>
            )}
            {error?.mainError && (
                <Portal>
                    <div
                        style={{
                            backgroundColor: '#00000010',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                        }}
                    >
                        <p>{error.mainError}</p>
                        <p>{error.detailsArr}</p>
                        <button
                            onClick={
                                error.callbackClearError
                                    ? error.callbackClearError
                                    : () =>
                                          store.dispatch({
                                              type: ActionType.CLEAN_ERROR,
                                          })
                            }
                        >
                            CLEAN ERROR !
                        </button>
                    </div>
                </Portal>
            )}
        </>
    );
};

export const startLoading = () =>
    setTimeout(() => store.dispatch({ type: ActionType.LOADING }));

export const stopLoading = (timer?: any) => {
    if (timer) clearInterval(timer);
    store.dispatch({ type: ActionType.LOADED });
};

export const setAppInfo = (info: IInfo) => {
    store.dispatch({
        type: ActionType.SET_INFO,
        payload: info,
    });
};

export const cleanAppInfo = () => {
    store.dispatch({
        type: ActionType.CLEAN_INFO,
    });
};

export const setAppError = (error: IError) => {
    store.dispatch({
        type: ActionType.SET_ERROR,
        payload: error,
    });
};

export const cleanAppError = () => {
    store.dispatch({
        type: ActionType.CLEAN_ERROR,
    });
};

export default useAppStatus;
