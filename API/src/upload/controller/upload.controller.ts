import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body,
    MaxFileSizeValidator,
    FileTypeValidator,
    UseGuards,
} from '@nestjs/common';
import { UploadService } from '../service/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDTO } from '../dto/upload.dto';
import { ParseFilePipe } from '@nestjs/common';
import { Routes } from '../../routes/Routes.enum';
import { UploadResDTO } from '../dto/upload-res.dto';
import { PermissionsGuard } from '../../auth/permissions/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../../auth/permissions/permissions.decorator';
import { PermissionsEnum } from '../../auth/permissions/permissions.enum';

@Controller(Routes.BASE_API_ROUTE)
export class FileController {
    constructor(private readonly uploadService: UploadService) {}

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.ADD_PRODUCTS])
    @Post(Routes.UPLOAD_ROUTE)
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
    ): Promise<UploadResDTO> {
        return await this.uploadService.proceedFile({
            file,
            params: {
                supplier: body.supplier,
                currency: body.cur,
            },
        });
    }
}
