import { Controller, Post, Get, Body } from '@nestjs/common';
import { Routes } from 'src/routes/Routes.enum';
import { ProductCreateDTO } from '../dto/product-create.dto';
import { ProductFetchService } from '../services/product-fetch.service';
import { ProductUploadService } from '../services/product-upload.service';
import { ProductQuery } from '../decorators/product-query-param.decorator';
import { ProductQueryParams } from '../types/product-query-params.type';
import { BulkUploadResDTO } from '../dto/bulk-upload-res-dto';
import { CompleteResponseDTO } from '../dto/complete-response.dto';
// import { UserId } from 'src/decorators/user-id.decorator';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.PRODUCTS_ROUTE}`)
export class ProductController {
    constructor(
        private readonly productFetchService: ProductFetchService,
        private readonly productUploadService: ProductUploadService,
    ) {}

    @Post()
    public async createProducts(
        @Body() productsArray: ProductCreateDTO[],
        // @UserId() userId: string,
    ): Promise<BulkUploadResDTO> {
        return await this.productUploadService.uploadBulkProducts(
            productsArray,
            'exampleUserId',
        );
    }

    @Get()
    public async getProducts(
        @ProductQuery() productQueryParams: ProductQueryParams,
    ): Promise<CompleteResponseDTO> {
        return await this.productFetchService.getAllProducts(
            productQueryParams,
        );
    }
}
