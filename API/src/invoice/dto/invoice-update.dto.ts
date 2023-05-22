import { InvoiceCreateDTO } from './invoice-create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class InvoiceUpdateDTO extends PartialType(InvoiceCreateDTO) {}
