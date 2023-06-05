import { Product } from '../entity/Product.entity';

export const productIdResMapper = (productEntity: Product): number =>
    productEntity.id;
