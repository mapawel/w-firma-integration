import { Module } from '@nestjs/common';
import { FileController } from './controller/file.controller';

@Module({
    controllers: [FileController],
})
export class FileModule {}
