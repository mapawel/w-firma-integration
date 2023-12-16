export class CreateReservationException extends Error {
    readonly name = 'CreateReservationException';

    constructor(readonly message: string, readonly options?: any) {
        super(message, options);
    }
}
