import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/Auth.module';
import { MainExceptionFilter } from './exception-filters/main-exception.filter';
import { InvoiceModule } from './invoice/invoice.module';
import { UploadModule } from './upload/upload.module';
import { ProductModule } from './product/product.module';
import { CodeTranslationModule } from './code-translation/code-translation.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env', '.env.auth', '.env.wfirma'],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', 'client', 'build'),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                logNotifications: true,
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        InvoiceModule,
        UploadModule,
        ProductModule,
        CodeTranslationModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: MainExceptionFilter,
        },
    ],
})
export class AppModule {}
