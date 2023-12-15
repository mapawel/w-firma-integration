import {
    Body,
    Controller,
    Delete,
    Get,
    ParseArrayPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { Routes } from '../../routes/Routes.enum';
import { SaleProductUploadService } from '../services/sale-product-upload.service';
import { BulkSaleUploadResDto } from '../dto/bulk-sale-upload-res-dto';
import { UserId } from '../../decorators/user-id.decorator';
import { SaleProductCreatePayloadDto } from '../dto/sale-product-create-payload.dto';
import { SaleProductCrudService } from '../services/sale-product-crud.service';
import { SaleProductQueryParamsDTO } from '../dto/sale-product-query-params.dto';
import { SaleProductGetResponseDTO } from '../dto/sale-product-get-response.dto';
import { SaleProductPatchDto } from '../dto/sale-product-patch.dto';
import { SaleProductPatchOrDeleteResDTO } from '../dto/sale-product-patch-delete-res.dto';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.SALE_PRODUCTS_ROUTE}`)
export class SaleProductController {
    constructor(
        private readonly saleProductUploadService: SaleProductUploadService,
        private readonly saleProductCrudService: SaleProductCrudService,
    ) {}

    // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // @Permissions([PermissionsEnum.ADD_PRODUCTS])
    @Post()
    public async createSaleProducts(
        @Body() createProductsPayload: SaleProductCreatePayloadDto,
        @UserId() userId: string,
    ): Promise<BulkSaleUploadResDto> {
        return await this.saleProductUploadService.uploadBulkSaleProducts(
            createProductsPayload.productsArray,
            // userId,
            'mockedUserId', //todo
        );
    }

    // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // @Permissions([PermissionsEnum.READ_PRODUCTS])
    @Get()
    public async getProducts(
        @Query() saleProductQueryParams: SaleProductQueryParamsDTO,
    ): Promise<SaleProductGetResponseDTO> {
        return await this.saleProductCrudService.getAllSaleProducts(
            saleProductQueryParams,
        );
    }

    // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // @Permissions([PermissionsEnum.UPDATE_PRODUCTS])
    @Patch()
    public async updateProductCode(
        @Body() patchData: SaleProductPatchDto,
        // @UserId() userId: string,
    ): Promise<SaleProductPatchOrDeleteResDTO> {
        return await this.saleProductCrudService.updateSaleProductCode(
            patchData,
            'mockedUser',
            // userId,
        );
    }

    // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // @Permissions([PermissionsEnum.REMOVE_PRODUCTS])
    @Delete()
    public async deleteProducts(
        @Body(new ParseArrayPipe({ items: Number, separator: ',' }))
        productIdsArray: number[],
    ): Promise<SaleProductPatchOrDeleteResDTO> {
        return await this.saleProductCrudService.deleteSaleProducts(
            productIdsArray,
        );
    }
}
