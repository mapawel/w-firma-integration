import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
    LoggerService,
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Routes } from 'src/routes/Routes.enum';

@Catch()
export class MainExceptionFilter implements ExceptionFilter {
    private readonly logger: LoggerService = new Logger(
        MainExceptionFilter.name,
    );
    private readonly configService: ConfigService = new ConfigService();

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status =
            exception instanceof HttpException ? exception.getStatus() : 500;

        this.logger.error(this.buildFullExceptionMessage(exception));

        if (exception instanceof UnauthorizedException)
            return response.redirect(
                this.configService.get<string>('BASE_URL', '') +
                    Routes.BASE_API_ROUTE +
                    Routes.AUTH_ROUTE,
            );

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

    private buildFullExceptionMessage(exception: Error): string {
        const errorResponse =
            exception instanceof BadRequestException
                ? exception.getResponse()
                : null;

        return `
        EXCEPTION: ${exception},
        STACK: ${exception.stack},
        CAUSE?: ${exception.cause},
        ${
            errorResponse &&
            `ERROR-RESPONSE: ${JSON.stringify(errorResponse, null, 2)}`
        }
        `;
    }
}
