import { IsString, IsEnum } from 'class-validator';
import { Supplier } from 'src/supplier/supppliers.enum';

export class CodeTranslationCreateDTO {
    @IsEnum(Supplier)
    supplier: Supplier;

    @IsString()
    supplierCode: string;

    @IsString()
    PN: string;
}
