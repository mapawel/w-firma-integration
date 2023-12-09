import { Injectable } from '@nestjs/common';
import * as csv from 'csvtojson/v2';
import {
    temporaryAbUserSetHeadings,
    temporaryAbUserSetHeddingsTranslation,
} from '../../../data/ab.data';
import { ProductCreateDTO } from 'src/product/dto/product-create.dto';
import { RowData, UploadType } from '../types';
import { ProductCreateDtoMapper } from '../mapper/upload-dto.mapper';
import { createUploadSettings } from '../settings/create-upload.settings';
import { ProductCreateDtoValidator } from '../validator/upoad-dto.validator';
import { UploadCodesResDto } from '../dto/upload-codes-res.dto';
import { Status } from 'src/product/status/status.enum';
import { ProceedFileReqDTO } from '../dto/proceed-file-req.dto';
import { UploadFileException } from '../exceptions/upload-file.exception';
import { CodeTranslationCreateDTO } from '../../code-translation/dto/code-translation-create.dto';
import { UploadProductsResDTO } from '../dto/upload-products-res.dto';
import { SaleProductCreateDto } from '../../sale-product/dto/sale-product-create.dto';
import { UploadSaleProductsResDTO } from '../dto/upload-sale-products-res.dto';

@Injectable()
export class UploadService {
    private currentSupplierUserSetHeddingsTranslation: Record<string, string>;
    private currentSupplierUserSetHeadings: Record<string, string>;

    public async proceedFile(
        proceedFileData: ProceedFileReqDTO,
    ): Promise<
        UploadProductsResDTO | UploadCodesResDto | UploadSaleProductsResDTO
    > {
        try {
            const {
                params: { type },
            }: { params: { type: UploadType } } = proceedFileData;

            this.currentSupplierUserSetHeddingsTranslation =
                temporaryAbUserSetHeddingsTranslation[type]; //TODO take from DB by supplier
            this.currentSupplierUserSetHeadings =
                temporaryAbUserSetHeadings[type]; //TODO take from DB by supplier

            if (type === UploadType.CODES)
                return await this.proceedCodesFileByRows(proceedFileData);
            if (type === UploadType.PRODUCTS)
                return await this.proceedProductsFileByRows(proceedFileData);
            if (type === UploadType.SALE)
                return await this.proceedReservationFileByRows(proceedFileData);
            throw new Error('no upload type specified');
        } catch (err) {
            throw new UploadFileException('Error while uploading file', {
                cause: err,
            });
        }
    }

    private async proceedReservationFileByRows(
        proceedFileData: ProceedFileReqDTO,
    ): Promise<UploadSaleProductsResDTO> {
        try {
            const {
                file,
                params: { currency, supplier },
            } = proceedFileData;

            const settings = createUploadSettings(
                this.currentSupplierUserSetHeadings,
            );
            const data: SaleProductCreateDto[] = [];
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

                    const createSaleProductDTO: SaleProductCreateDto =
                        await ProductCreateDtoValidator.createDtoAndValidate<SaleProductCreateDto>(
                            SaleProductCreateDto,
                            {
                                ...productRow,
                                currency,
                                supplier,
                            },
                            productLineNo,
                        );

                    totalValue +=
                        createSaleProductDTO.quantity *
                        createSaleProductDTO.netPrice;
                    totalQty += createSaleProductDTO.quantity;
                    totalPositions += 1;

                    data.push(createSaleProductDTO);
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
            console.log('===================================> err > ', err);

            throw new UploadFileException(
                'Error while proceeding file by rows',
                {
                    cause: err,
                },
            );
        }
    }

    private async proceedProductsFileByRows(
        proceedFileData: ProceedFileReqDTO,
    ): Promise<UploadProductsResDTO> {
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
                        await ProductCreateDtoValidator.createDtoAndValidate<ProductCreateDTO>(
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

    private async proceedCodesFileByRows(
        proceedFileData: ProceedFileReqDTO,
    ): Promise<UploadCodesResDto> {
        try {
            const {
                file,
                params: { supplier },
            } = proceedFileData;

            const settings = createUploadSettings(
                this.currentSupplierUserSetHeadings,
            );
            const data: CodeTranslationCreateDTO[] = [];
            let totalPositions = 0;

            await csv(settings)
                .fromString(file.buffer.toString())
                .subscribe(async (csvLine, productLineNo) => {
                    const codesRow: RowData =
                        ProductCreateDtoMapper.mapFileRowToProductCreateDTO(
                            csvLine,
                            this.currentSupplierUserSetHeddingsTranslation,
                        );

                    const codeTranslationCreateDTO =
                        await ProductCreateDtoValidator.createDtoAndValidate<CodeTranslationCreateDTO>(
                            CodeTranslationCreateDTO,
                            {
                                ...codesRow,
                                supplier,
                            },
                            productLineNo,
                        );

                    totalPositions += 1;

                    data.push(codeTranslationCreateDTO);
                })
                .on('error', () => {
                    return false;
                });

            if (data.length === 0) throw new Error('No data in file found!');

            return {
                totalPositions,
                data,
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
