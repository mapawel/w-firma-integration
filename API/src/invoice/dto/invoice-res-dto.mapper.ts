import { Product } from 'src/product/entity/Product.entity';
import { Invoice } from '../entity/Invoice.entity';
import { InvoiceResDTO } from './invoice-res.dto';

export const invoiceResDtoMapper = (invoiceEntity: Invoice): InvoiceResDTO => ({
    id: invoiceEntity.id,
    number: invoiceEntity.number,
    supplier: invoiceEntity.supplier,
    addedBy: invoiceEntity.addedBy,
    addedAt: invoiceEntity.addedAt,
    updatedBy: invoiceEntity.updatedBy,
    updatedAt: invoiceEntity.updatedAt,
    products: invoiceEntity.products.map((product: Product) => ({
        id: product.id,
        productCode: product.productCode?.PN,
        supplierCode: product.supplierCode,
        quantity: product.quantity,
        netPrice: product.netPrice,
        status: product.status,
    })),
});
