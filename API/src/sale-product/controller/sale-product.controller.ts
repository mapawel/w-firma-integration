import { Body, Controller, Post } from '@nestjs/common';
import { Routes } from '../../routes/Routes.enum';
import { SaleProductUploadService } from '../services/sale-product-upload.service';
import { BulkSaleUploadResDto } from '../dto/bulk-sale-upload-res-dto';
import { UserId } from '../../decorators/user-id.decorator';
import { SaleProductCreatePayloadDto } from '../dto/sale-product-create-payload.dto';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.SALE_PRODUCTS_ROUTE}`)
export class SaleProductController {
    constructor(
        // private readonly productFetchAndDeleteAndPatchService: ProductFetchAndDeleteAndPatchService,
        private readonly saleProductUploadService: SaleProductUploadService,
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

    //
    // // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // // @Permissions([PermissionsEnum.READ_PRODUCTS])
    // @Get()
    // public async getProducts(
    //     @Query() productQueryParams: ProductQueryParamsDTO,
    // ): Promise<CompleteResponseDTO> {
    //     return await this.productFetchAndDeleteAndPatchService.getAllProducts(
    //         productQueryParams,
    //     );
    // }
    //
    // // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // // @Permissions([PermissionsEnum.UPDATE_PRODUCTS])
    // @Patch()
    // public async updateProductCode(
    //     @Body() patchData: ProductPatchDTO,
    //     @UserId() userId: string,
    // ): Promise<ProductPatchOrDeleteResDTO> {
    //     return await this.productFetchAndDeleteAndPatchService.updateProductCode(
    //         patchData,
    //         userId,
    //     );
    // }
    //
    // // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // // @Permissions([PermissionsEnum.REMOVE_PRODUCTS])
    // @Delete()
    // public async deleteProducts(
    //     @Body(new ParseArrayPipe({ items: Number, separator: ',' }))
    //     productIdsArray: number[],
    // ): Promise<ProductPatchOrDeleteResDTO> {
    //     return await this.productFetchAndDeleteAndPatchService.deleteProducts(
    //         productIdsArray,
    //     );
    // }
}
