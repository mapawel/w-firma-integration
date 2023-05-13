import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Invoice } from '../entity/Invoice.entity';
import { InvoiceResDTO } from '../dto/invoiceRes.dto';
import { InvoiceCreateDTO } from '../dto/invoiceCreate.dto';
import { InvoiceUpdateDTO } from '../dto/invoiceUpdate.dto';
import { invoiceResDtoMapper } from '../dto/invoiceResDto.mapper';
import { InvoiceRepoException } from '../exceptions/invoice-repo.exception';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectRepository(Invoice)
        private readonly invoiceRepository: Repository<Invoice>,
    ) {}

    public async getAllInvoices(): Promise<InvoiceResDTO[]> {
        try {
            const allInvoices: Invoice[] = await this.invoiceRepository.find();
            return allInvoices.map((invoice: Invoice) =>
                invoiceResDtoMapper(invoice),
            );
        } catch (error) {
            throw new InvoiceRepoException(
                'Error while getting all invoices.',
                { cause: error },
            );
        }
    }

    public async getInvoiceById(invoiceId: number): Promise<InvoiceResDTO> {
        try {
            const invoice: Invoice | null =
                await this.invoiceRepository.findOne({
                    where: { id: invoiceId },
                });
            if (!invoice) {
                throw new NotFoundException('Invoice not found.');
            }
            return invoiceResDtoMapper(invoice);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InvoiceRepoException(
                `Error while getting invoice with passed id: ${invoiceId}`,
                { cause: error },
            );
        }
    }

    public async createInvoice(
        invoiceCreateDTO: InvoiceCreateDTO,
        addedBy: string,
    ): Promise<InvoiceResDTO> {
        try {
            const newInvoice: Invoice = this.invoiceRepository.create({
                addedBy,
                addedAt: new Date(Date.now()),
                ...invoiceCreateDTO,
            });
            const savedInvoice: Invoice = await this.invoiceRepository.save(
                newInvoice,
            );

            return invoiceResDtoMapper(savedInvoice);
        } catch (error) {
            throw new InvoiceRepoException(
                `Error while creating invoice, payload: ${JSON.stringify(
                    invoiceCreateDTO,
                    null,
                    2,
                )}.`,
                { cause: error },
            );
        }
    }

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
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InvoiceRepoException(
                `Error while updating invoice with passed id: ${invoiceId}, payload: ${JSON.stringify(
                    invoiceUpdateDTO,
                    null,
                    2,
                )}.`,
                { cause: error },
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
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InvoiceRepoException(
                `Error while deleting invoice with passed id: ${invoiceId}`,
                { cause: error },
            );
        }
    }
}
