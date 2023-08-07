import {
    Body,
    Controller,
    FileTypeValidator,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UploadService } from '../service/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDTO } from '../dto/upload.dto';
import { Routes } from '../../routes/Routes.enum';
import { Permissions } from '../../auth/permissions/permissions.decorator';
import { PermissionsEnum } from '../../auth/permissions/permissions.enum';
import { UploadProductsResDTO } from '../dto/upload-products-res.dto';
import { UploadCodesResDto } from '../dto/upload-codes-res.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../../auth/permissions/permissions.guard';

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
    ): Promise<UploadProductsResDTO | UploadCodesResDto> {
        return await this.uploadService.proceedFile({
            file,
            params: {
                supplier: body.supplier,
                currency: body.cur,
                type: body.type,
            },
        });
    }
}
