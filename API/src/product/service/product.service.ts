import { Injectable } from '@nestjs/common';
import { ProductCreateDTO } from '../dto/product-create.dto';

@Injectable()
export class ProductService {
    public async uploadBulkProducts(productsArray: ProductCreateDTO[]) {
        return true;
    }
}
