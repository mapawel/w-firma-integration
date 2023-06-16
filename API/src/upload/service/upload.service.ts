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
import { UploadResDTO } from '../dto/upload-res.dto';
import { Status } from 'src/product/status/status.enum';
import { ProceedFileReqDTO } from '../dto/proceed-file-req.dto';
import { UploadFileException } from '../exceptions/upload-file.exception';

@Injectable()
export class UploadService {
    private currentSupplierUserSetHeddingsTranslation: Record<string, string>;
    private currentSupplierUserSetHeadings: Record<string, string>;

    public async proceedFile(proceedFileData: ProceedFileReqDTO) {
        try {
            this.currentSupplierUserSetHeddingsTranslation =
                temporaryAbUserSetHeddingsTranslation; //TODO take from DB by supplier
            this.currentSupplierUserSetHeadings = temporaryAbUserSetHeadings; //TODO take from DB by supplier
            return await this.proceedFileByRows(proceedFileData);
        } catch (err) {
            throw new UploadFileException('Error while uploading file', {
                cause: err,
            });
        }
    }

    private async proceedFileByRows(
        proceedFileData: ProceedFileReqDTO,
    ): Promise<UploadResDTO> {
        try {
            const {
                file,
                params: { currency, supplier },
            } = proceedFileData;

            const settings = createUploadSettings(
                this.currentSupplierUserSetHeadings,
            );
            const data: ProductCreateDTO[] = [];
            let totalValue = 0;
            let totalQty = 0;
            let totalPositions = 0;

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
                                currency,
                                supplier,
                            },
                            productLineNo,
                        );

                    totalValue +=
                        createProductDTO.quantity * createProductDTO.netPrice;
                    totalQty += createProductDTO.quantity;
                    totalPositions += 1;

                    data.push(createProductDTO);
                })
                .on('error', () => {
                    return false;
                });

            if (data.length === 0) throw new Error('No data in file found!');

            return {
                totalValue,
                totalQty,
                totalPositions,
                data,
                status: Status.NEW,
            };
        } catch (err) {
            throw new UploadFileException(
                'Error while proceeding file by rows',
                {
                    cause: err,
                },
            );
        }
    }
}
