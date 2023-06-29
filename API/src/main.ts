import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

dotenv.config();

async function bootstrap() {
    const PORT = process.env.PORT || 3005;

    const app = await NestFactory.create(AppModule);

    app.use(bodyParser({ limit: '10mb' }));

    if (!process.env.COOKIE_SECRET) throw new Error('Cookie secret not set');
    app.use(cookieParser(process.env.COOKIE_SECRET));

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    await app.listen(PORT, () =>
        console.log(`Server is running on port ${PORT}`),
    );
}

bootstrap();
