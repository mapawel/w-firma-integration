import { IsNumber, IsString } from 'class-validator';
import { Supplier } from '../../supplier/supppliers.enum';
import { ProductResDTO } from '../dto/product-res.dto';
import { Status } from '../status/status.enum';

export class ProductQueryParams {
    @IsString({
        message:
            'Supplier code must be a string!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
    })
    supplierCode: string;

    @IsString()
    productCode: string;

    @IsString()
    currency: string;

    supplier: Supplier;
    status: Status | 'all';

    @IsString()
    invoice: string;
    sortParam: keyof ProductResDTO;
    sortDirect: 'ASC' | 'DESC';

    @IsNumber()
    records: number;

    @IsNumber()
    skip: number;
}
