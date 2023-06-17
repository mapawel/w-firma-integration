export type Data = {
    mainInfo: string | null;
    detailsArr: string[];
    callbackClearInfo?: () => void;
    callbackClearInfoLabel?: string;
}
