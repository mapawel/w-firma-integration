export class CodeTranslationException extends Error {
    constructor(readonly message: string, readonly options?: any) {
        super(message, options);
    }
    readonly name = 'CodeTranslationException';
}
