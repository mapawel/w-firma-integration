export class SaleProductException extends Error {
    readonly name = 'ProductException';

    constructor(readonly message: string, readonly options?: any) {
        super(message, options);
    }
}
