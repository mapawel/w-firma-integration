import { Module } from '@nestjs/common';
import { FileController } from './controller/upload.controller';
import { UploadService } from './service/upload.service';

@Module({
    controllers: [FileController],
    providers: [UploadService],
})
export class UploadModule {}
