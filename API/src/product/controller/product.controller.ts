import { Controller, Post, Get, Body, Delete, Query } from '@nestjs/common';
import { ParseArrayPipe } from '@nestjs/common';
import { Routes } from 'src/routes/Routes.enum';
import { ProductFetchService } from '../services/product-fetch.service';
import { ProductUploadService } from '../services/product-upload.service';
import { ProductQueryParamsDTO } from '../dto/product-query-params.dto';
import { BulkUploadResDTO } from '../dto/bulk-upload-res-dto';
import { CompleteResponseDTO } from '../dto/complete-response.dto';
import { ProductDeleteResDTO } from '../dto/product-delete-res.dto';
import { ProductCreatePayloadDTO } from '../dto/product-create-payload.dto';
// import { UserId } from 'src/decorators/user-id.decorator';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.PRODUCTS_ROUTE}`)
export class ProductController {
    constructor(
        private readonly productFetchService: ProductFetchService,
        private readonly productUploadService: ProductUploadService,
    ) {}

    @Post()
    public async createProducts(
        @Body() createProductsPayload: ProductCreatePayloadDTO,
        // @UserId() userId: string,
    ): Promise<BulkUploadResDTO> {
        return await this.productUploadService.uploadBulkProducts(
            createProductsPayload.productsArray,
            'exampleUserId',
        );
    }

    @Get()
    public async getProducts(
        @Query() productQueryParams: ProductQueryParamsDTO,
    ): Promise<CompleteResponseDTO> {
        return await this.productFetchService.getAllProducts(
            productQueryParams,
        );
    }

    @Delete()
    public async deleteProducts(
        @Body(new ParseArrayPipe({ items: Number, separator: ',' }))
        productIdsArray: number[],
    ): Promise<ProductDeleteResDTO> {
        return await this.productUploadService.deleteProducts(productIdsArray);
    }
}
