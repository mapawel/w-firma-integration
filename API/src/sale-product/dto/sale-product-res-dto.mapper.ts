import { SaleProduct } from '../entity/Sale-product.entity';
import { SaleProductResDTO } from './sale-product-res.dto';

export const saleProductResDtoMapper = (
    saleProductEntity: SaleProduct,
): SaleProductResDTO => ({
    id: saleProductEntity.id,
    customerId: saleProductEntity.customerId,
    reservationId: saleProductEntity.reservationId,
    supplierCode: saleProductEntity.supplierCode,
    productCode: saleProductEntity.productCode?.PN,
    quantity: saleProductEntity.quantity,
    netPrice: saleProductEntity.netPrice,
    currency: saleProductEntity.currency,
    status: saleProductEntity.status,
    addedBy: saleProductEntity.addedBy,
    addedAt: saleProductEntity.addedAt,
    updatedBy: saleProductEntity.updatedBy,
    updatedAt: saleProductEntity.updatedAt,
});
