import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    ForbiddenException,
    HttpException,
    NotFoundException,
    RequestTimeoutException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class MainExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status =
            exception instanceof HttpException ? exception.getStatus() : 500;
        console.log(exception);
        this.logException(exception);

        if (exception instanceof ForbiddenException)
            return response.status(status).json(exception.getResponse());

        if (exception instanceof RequestTimeoutException)
            return response.status(status).json(exception.getResponse());

        if (exception instanceof NotFoundException)
            return response.status(status).json(exception.getResponse());

        if (exception instanceof BadRequestException)
            return response.status(status).json(exception.getResponse());

        return response.status(status).json({
            message:
                status === 500
                    ? 'Ups... Something went wrong. Try again later.'
                    : exception.message,
        });
    }

    private logException(exception: Error): void {
        const errorResponse =
            exception instanceof BadRequestException
                ? exception.getResponse()
                : null;

        console.log(' --->   EXCEPTION: ', exception.message);
        console.log(' --->   STACK: ', exception.stack);
        console.log(' --->   CAUSE?: ', exception.cause);
        if (errorResponse)
            console.log(
                ' --->   ERROR-RESPONSE?: ',
                JSON.stringify(errorResponse, null, 2),
            );
    }
}
