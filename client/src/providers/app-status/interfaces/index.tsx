export interface IInfo {
    mainInfo: string | null;
    detailsArr: string[];
    callbackClearInfo: () => void;
}

export interface IError {
    mainError: string | null;
    detailsArr: string[];
    callbackClearError?: () => void;
}
