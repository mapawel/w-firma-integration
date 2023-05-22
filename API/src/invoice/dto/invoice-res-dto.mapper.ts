import { Invoice } from '../entity/Invoice.entity';
import { InvoiceResDTO } from './invoice-res.dto';

export const invoiceResDtoMapper = (invoiceEntity: Invoice): InvoiceResDTO => ({
    id: invoiceEntity.id,
    number: invoiceEntity.number,
    // supplier: invoiceEntity.supplier,
    addedBy: invoiceEntity.addedBy,
    addedAt: invoiceEntity.addedAt,
    updatedBy: invoiceEntity.updatedBy,
    updatedAt: invoiceEntity.updatedAt,
    products: invoiceEntity.products,
});
