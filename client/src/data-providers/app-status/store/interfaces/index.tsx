import { Data } from '../../types/data.type';

export enum ActionType {
    LOADING = 'loading',
    LOADED = 'loaded',
    SET_DATA = 'setData',
    CLEAN_DATA = 'cleanData',
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
    data: Data;
}
