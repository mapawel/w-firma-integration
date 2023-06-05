import { Controller, Post, Get, Body } from '@nestjs/common';
import { Routes } from 'src/routes/Routes.enum';
import { ProductCreateDTO } from '../dto/product-create.dto';
import { ProductService } from '../service/product.service';
import { ProductResDTO } from '../dto/product-res.dto';
import { ProductQuery } from '../decorators/product-query-param.decorator';
import { ProductQueryParams } from '../types/product-query-params.type';
import { BulkUploadResDTO } from '../dto/bulk-upload-res-dto';
// import { UserId } from 'src/decorators/user-id.decorator';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.PRODUCTS_ROUTE}`)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    public async createProducts(
        @Body() productsArray: ProductCreateDTO[],
        // @UserId() userId: string,
    ): Promise<BulkUploadResDTO> {
        return await this.productService.uploadBulkProducts(
            productsArray,
            'exampleUserId',
        );
    }

    @Get()
    public async getProducts(
        @ProductQuery() productQueryParams: ProductQueryParams,
    ): Promise<ProductResDTO[]> {
        return await this.productService.getAllProducts(productQueryParams);
    }
}
