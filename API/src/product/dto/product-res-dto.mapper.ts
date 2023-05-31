import { Product } from '../entity/Product.entity';
import { ProductResDTO } from './product-res.dto';

export const productResDtoMapper = (productEntity: Product): ProductResDTO => ({
    id: productEntity.id,
    supplierIndex: productEntity.supplierIndex,
    quantity: productEntity.quantity,
    netPrice: productEntity.netPrice,
    currency: productEntity.currency,
    invoice: productEntity.invoice.number,
    supplier: productEntity.supplier,
    status: productEntity.status,
    addedBy: productEntity.addedBy,
    addedAt: productEntity.addedAt,
    updatedBy: productEntity.updatedBy,
    updatedAt: productEntity.updatedAt,
});
