import { UploadType } from '../types';

export type ProceedFileReqDTO = {
    file: Express.Multer.File;
    params: {
        supplier: string;
        type: UploadType;
        currency?: string;
    };
};
