import {
    Controller,
    Post,
    Get,
    Body,
    Delete,
    Query,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { ParseArrayPipe } from '@nestjs/common';
import { Routes } from '../../routes/Routes.enum';
import { ProductFetchAndDeleteAndPatchService } from '../services/product-fetch-delete-patch.service';
import { ProductUploadService } from '../services/product-upload.service';
import { ProductQueryParamsDTO } from '../dto/product-query-params.dto';
import { BulkUploadResDTO } from '../dto/bulk-upload-res-dto';
import { CompleteResponseDTO } from '../dto/complete-response.dto';
import { ProductPatchOrDeleteResDTO } from '../dto/product-delete-res.dto';
import { ProductCreatePayloadDTO } from '../dto/product-create-payload.dto';
import { ProductPatchDTO } from '../dto/product-patch.dto';
import { UserId } from '../../decorators/user-id.decorator';
import { Permissions } from '../../auth/permissions/permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions/permissions.guard';
import { PermissionsEnum } from '../../auth/permissions/permissions.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.PRODUCTS_ROUTE}`)
export class ProductController {
    constructor(
        private readonly productFetchAndDeleteAndPatchService: ProductFetchAndDeleteAndPatchService,
        private readonly productUploadService: ProductUploadService,
    ) {}

    @Post()
    public async createProducts(
        @Body() createProductsPayload: ProductCreatePayloadDTO,
        @UserId() userId: string,
    ): Promise<BulkUploadResDTO> {
        return await this.productUploadService.uploadBulkProducts(
            createProductsPayload.productsArray,
            userId,
        );
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions([PermissionsEnum.READ_PRODUCTS])
    @Get()
    public async getProducts(
        @Query() productQueryParams: ProductQueryParamsDTO,
    ): Promise<CompleteResponseDTO> {
        return await this.productFetchAndDeleteAndPatchService.getAllProducts(
            productQueryParams,
        );
    }

    @Patch()
    public async updateProductCode(
        @Body() patchData: ProductPatchDTO,
        @UserId() userId: string,
    ): Promise<ProductPatchOrDeleteResDTO> {
        return await this.productFetchAndDeleteAndPatchService.updateProductCode(
            patchData,
            userId,
        );
    }

    @Delete()
    public async deleteProducts(
        @Body(new ParseArrayPipe({ items: Number, separator: ',' }))
        productIdsArray: number[],
    ): Promise<ProductPatchOrDeleteResDTO> {
        return await this.productFetchAndDeleteAndPatchService.deleteProducts(
            productIdsArray,
        );
    }
}
