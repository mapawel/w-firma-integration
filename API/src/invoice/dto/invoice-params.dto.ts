import { IsNumberString } from 'class-validator';

export class InvoiceParamsDTO {
    @IsNumberString()
    id: number;
}
