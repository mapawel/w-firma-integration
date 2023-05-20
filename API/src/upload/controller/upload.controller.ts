import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body,
    MaxFileSizeValidator,
    FileTypeValidator,
} from '@nestjs/common';
import { UploadService } from '../service/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDTO } from '../dto/upload.dto';
import { ParseFilePipe } from '@nestjs/common';
import { ProductCreateDTO } from 'src/product/dto/product-create.dto';

@Controller('/api/upload')
export class FileController {
    constructor(private readonly uploadService: UploadService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    public async upload(
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
    ): Promise<ProductCreateDTO[]> {
        const data: ProductCreateDTO[] =
            await this.uploadService.getAppDataFromFile(
                file,
                body.supplier,
                body.cur,
            );
        return data;
    }
}
