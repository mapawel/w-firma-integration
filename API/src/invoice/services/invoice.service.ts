import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Invoice } from '../entity/Invoice.entity';
import { InvoiceResDTO } from '../dto/invoice-res.dto';
// import { InvoiceCreateDTO } from '../dto/invoice-create.dto';
import { InvoiceUpdateDTO } from '../dto/invoice-update.dto';
import { invoiceResDtoMapper } from '../dto/invoice-res-dto.mapper';
import { InvoiceException } from '../exceptions/invoice.exception';
import { Supplier } from '../../supplier/supppliers.enum';
import { InvoiceQueryParams } from '../types/invoce-query-params.type';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectRepository(Invoice)
        private readonly invoiceRepository: Repository<Invoice>,
    ) {}

    public async getAllInvoices(
        invoiceQueryParams: InvoiceQueryParams,
    ): Promise<InvoiceResDTO[]> {
        try {
            const {
                number,
                supplier,
                sortParam,
                sortDirect,
                records,
                skip,
            }: InvoiceQueryParams = invoiceQueryParams;

            const allInvoices: Invoice[] = await this.invoiceRepository.find({
                where: {
                    number,
                    supplier,
                },
                relations: {
                    products: {
                        productCode: true,
                    },
                },
                order: {
                    [sortParam]: sortDirect,
                },
                take: records,
                skip,
            });

            return allInvoices.map((invoice: Invoice) =>
                invoiceResDtoMapper(invoice),
            );
        } catch (err) {
            throw new InvoiceException(
                'Error while getting all invoices from DB.',
                {
                    cause: err,
                },
            );
        }
    }

    public async getInvoiceById(invoiceId: number): Promise<InvoiceResDTO> {
        try {
            const invoice: Invoice | null =
                await this.invoiceRepository.findOne({
                    where: { id: invoiceId },
                    relations: {
                        products: {
                            productCode: true,
                        },
                    },
                });
            if (!invoice) {
                throw new NotFoundException('Invoice not found.');
            }

            return invoiceResDtoMapper(invoice);
        } catch (err) {
            if (err instanceof NotFoundException) throw err;
            throw new InvoiceException(
                `Error while getting invoice from DB with passed id: ${invoiceId}`,
                { cause: err },
            );
        }
    }

    // PROBABLY TO REMOVE

    // public async createInvoice(
    //     invoiceCreateDTO: InvoiceCreateDTO,
    //     addedBy: string,
    // ): Promise<InvoiceResDTO> {
    //     try {
    //         const newInvoice: Invoice = this.invoiceRepository.create({
    //             addedBy,
    //             addedAt: new Date(Date.now()),
    //             ...invoiceCreateDTO,
    //         });
    //         const savedInvoice: Invoice = await this.invoiceRepository.save(
    //             newInvoice,
    //         );

    //         return invoiceResDtoMapper(savedInvoice);
    //     } catch (err) {
    //         throw new InvoiceException(
    //             `Error while creating invoice in DB, payload: ${JSON.stringify(
    //                 invoiceCreateDTO,
    //                 null,
    //                 2,
    //             )}.`,
    //             { cause: err },
    //         );
    //     }
    // }

    public async updateInvoice(
        invoiceId: number,
        invoiceUpdateDTO: InvoiceUpdateDTO,
        updatedBy: string,
    ): Promise<InvoiceResDTO> {
        try {
            const result: UpdateResult = await this.invoiceRepository.update(
                invoiceId,
                {
                    updatedBy,
                    updatedAt: new Date(Date.now()),
                    ...invoiceUpdateDTO,
                },
            );
            if (!result.affected)
                throw new NotFoundException(
                    'Cannot update invoice! Resource not found.',
                );

            const updatedInvoice: InvoiceResDTO = await this.getInvoiceById(
                invoiceId,
            );
            return updatedInvoice;
        } catch (err) {
            if (err instanceof NotFoundException) throw err;
            throw new InvoiceException(
                `Error while updating invoice in DB with passed id: ${invoiceId}, payload: ${JSON.stringify(
                    invoiceUpdateDTO,
                    null,
                    2,
                )}.`,
                { cause: err },
            );
        }
    }

    public async deleteInvoice(invoiceId: number): Promise<true> {
        try {
            const result: DeleteResult = await this.invoiceRepository.delete(
                invoiceId,
            );
            if (!result.affected)
                throw new NotFoundException(
                    'Cannot delete invoice! Resource not found.',
                );
            return true;
        } catch (err) {
            if (err instanceof NotFoundException) throw err;
            throw new InvoiceException(
                `Error while deleting invoice in DB with passed id: ${invoiceId}`,
                { cause: err },
            );
        }
    }

    public async findOrCreateInvoiceEntity(
        invoiceNo: string,
        supplier: Supplier,
        userId: string,
    ): Promise<Invoice> {
        try {
            let invoiceEntity: Invoice | null = null;

            invoiceEntity = await this.invoiceRepository.findOne({
                where: {
                    number: invoiceNo,
                },
            });

            if (!invoiceEntity) {
                const newInvoice = this.invoiceRepository.create({
                    number: invoiceNo,
                    addedBy: userId,
                    addedAt: new Date(Date.now()),
                    supplier,
                    products: [],
                });
                invoiceEntity = await this.invoiceRepository.save(newInvoice);
            }
            return invoiceEntity;
        } catch (err) {
            if (err instanceof NotFoundException) throw err;
            throw new InvoiceException(
                `Error while find or create an invoice in DB with passed number: ${invoiceNo}`,
                { cause: err },
            );
        }
    }
}
