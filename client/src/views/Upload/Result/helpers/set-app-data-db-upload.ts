import {
    cleanAppData,
    setAppData,
} from '@/providers/app-status/use-app-status';
import { BulkUploadResDTO } from '../types/bulk-upload-res.dto';
import { buildFeedbackModalDetails } from './build-feedback-modal-details';
import { NavigateFunction } from 'react-router-dom';

export const setAppDataAsDBUpload = (
    mainInfo: string,
    responseData: BulkUploadResDTO,
    navigate: NavigateFunction,
): void => {
    setAppData({
        mainInfo,
        detailsArr: buildFeedbackModalDetails(responseData),
        callbackClearInfo: () => {
            cleanAppData();
            navigate('/', { replace: true });
        },
        callbackClearInfoLabel: 'Wróć do strony głównej',
    });
};
