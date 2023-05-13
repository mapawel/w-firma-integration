import { Invoice } from '../entity/Invoice.entity';
import { InvoiceResDTO } from './invoiceRes.dto';

export const invoiceResDtoMapper = (invoiceEntity: Invoice): InvoiceResDTO => ({
    id: invoiceEntity.id,
    number: invoiceEntity.number,
    sellerName: invoiceEntity.sellerName,
    addedBy: invoiceEntity.addedBy,
    addedAt: invoiceEntity.addedAt,
    updatedBy: invoiceEntity.updatedBy,
    updatedAt: invoiceEntity.updatedAt,
});
