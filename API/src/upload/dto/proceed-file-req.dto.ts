export type ProceedFileReqDTO = {
    file: Express.Multer.File;
    params: {
        supplier: string;
        currency: string;
    };
};
