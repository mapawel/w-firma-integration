import { Controller, Post, Body } from '@nestjs/common';
import { Routes } from 'src/routes/Routes.enum';
import { ProductCreateDTO } from '../dto/product-create.dto';
import { ProductService } from '../service/product.service';
// import { UserId } from 'src/decorators/user-id.decorator';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.PRODUCTS_ROUTE}`)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    public async createProducts(
        @Body() productsArray: ProductCreateDTO[],
        // @UserId() userId: string,
    ) {
        return await this.productService.uploadBulkProducts(
            productsArray,
            'exampleUserId',
        );
    }
}
