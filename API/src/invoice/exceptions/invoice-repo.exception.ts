export class InvoiceRepoException extends Error {
    constructor(readonly message: string, readonly options?: any) {
        super(message, options);
    }
    readonly name = 'InvoiceRepoException';
}
