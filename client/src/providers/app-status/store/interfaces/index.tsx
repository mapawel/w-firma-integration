import { IInfo, IError } from "@/providers/app-status/interfaces";

export enum ActionType {
    LOADING = 'loading',
    LOADED = 'loaded',
    SET_INFO = 'setInfo',
    CLEAN_INFO = 'cleanInfo',
    SET_ERROR = 'setError',
    CLEAN_ERROR = 'cleanError',
}
export interface IStore {
    isReady: boolean;
    dispatch: (action: IAction) => void;
}

export interface IAction {
    type: ActionType;
    payload?: any;
}

export interface IState {
    isLoading: boolean;
    info: IInfo;
    error: IError;
}
