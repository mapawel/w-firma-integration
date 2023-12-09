export class CustomerException extends Error {
    readonly name = 'CustomerException';

    constructor(readonly message: string, readonly options?: any) {
        super(message, options);
    }
}
