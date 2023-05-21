import { IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import validators from '../../validation/settings/validators.json';
import { buildValidatorKeyParamsGetter } from '../../validation/utils';
import { trimTransformer } from '../../validation/utils';

const getInvoiceValidatorParam =
    buildValidatorKeyParamsGetter<InvoiceCreateDTO>({
        entityName: 'invoice',
        validatorsObject: validators,
    });

export class InvoiceCreateDTO {
    @IsString()
    @Length(
        getInvoiceValidatorParam('number', 'minLength') || 4,
        getInvoiceValidatorParam('number', 'maxLength') || 36,
    )
    @Transform(trimTransformer)
    number: string;

    @IsString()
    @Length(
        getInvoiceValidatorParam('supplier', 'minLength') || 4,
        getInvoiceValidatorParam('supplier', 'maxLength') || 36,
    )
    @Transform(trimTransformer)
    supplier: string;
}
