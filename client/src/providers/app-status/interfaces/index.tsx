export interface IData {
    mainInfo: string | null;
    detailsArr: string[];
    callbackClearInfo?: () => void;
    callbackClearInfoLabel?: string;
}
