import { InvoiceCreateDTO } from './invoiceCreate.dto';
import { PartialType } from '@nestjs/mapped-types';

export class InvoiceUpdateDTO extends PartialType(InvoiceCreateDTO) {}
