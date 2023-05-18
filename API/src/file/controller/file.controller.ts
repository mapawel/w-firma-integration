import { writeFile } from 'fs/promises';
import {
    Req,
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body,
    MaxFileSizeValidator,
    FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDTO } from '../dto/upload.dto';

import { ParseFilePipe } from '@nestjs/common';

@Controller('/api/upload')
export class FileController {
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    public async load(
        @Body() body: UploadDTO,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: '.csv' }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        console.log('body.supplier ----> ', body.supplier);
        await writeFile(`./fff/${file.originalname}`, file.buffer);
    }
}
