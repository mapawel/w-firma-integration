import { Injectable } from '@nestjs/common';
import * as csv from 'csvtojson/v2';
import {
    temporaryAbUserSetHeddingsTranslation,
    temporaryAbUserSetHeadings,
} from '../../../data/ab.data';
import { ProductCreateDTO } from 'src/product/dto/product-create.dto';
import { RowData } from '../types';
import { ProductCreateDtoMapper } from '../mapper/upload-dto.mapper';
import { createUploadSettings } from '../settings/create-upload.settings';
import { ProductCreateDtoValidator } from '../validator/upoad-dto.validator';

@Injectable()
export class UploadService {
    private currentSupplierUserSetHeddingsTranslation: Record<string, string>;
    private currentSupplierUserSetHeadings: Record<string, string>;

    public async getAppDataFromFile(
        file: Express.Multer.File,
        supplier: string,
        cur: string,
    ) {
        this.currentSupplierUserSetHeddingsTranslation =
            temporaryAbUserSetHeddingsTranslation; //TODO take from DB by supplier
        this.currentSupplierUserSetHeadings = temporaryAbUserSetHeadings; //TODO take from DB by supplier
        return await this.proceedFileByRows(file, cur);
    }

    private async proceedFileByRows(
        file: Express.Multer.File,
        cur: string,
    ): Promise<ProductCreateDTO[]> {
        const settings = createUploadSettings(
            this.currentSupplierUserSetHeadings,
        );
        const data: ProductCreateDTO[] = [];

        await csv(settings)
            .fromString(file.buffer.toString())
            .subscribe(async (csvLine, productLineNo) => {
                const productRow: RowData =
                    ProductCreateDtoMapper.mapFileRowToProductCreateDTO(
                        csvLine,
                        this.currentSupplierUserSetHeddingsTranslation,
                    );

                const createProductDTO =
                    await ProductCreateDtoValidator.createDtoAndValidate(
                        ProductCreateDTO,
                        {
                            ...productRow,
                            currency: cur,
                        },
                        productLineNo,
                    );

                data.push(createProductDTO);
            })
            .on('error', () => {
                return false;
            });

        if (data.length === 0) throw new Error('No data in file found!');

        return data;
    }
}
