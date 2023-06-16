export class UploadFileException extends Error {
    constructor(readonly message: string, readonly options?: any) {
        super(message, options);
    }
    readonly name = 'UploadFileException';
}
