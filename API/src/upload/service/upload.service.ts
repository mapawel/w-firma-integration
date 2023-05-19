import { BadRequestException, Injectable } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as csv from 'csvtojson/v2';
import {
    temporaryAbUserSetHeddingsTranslation,
    temporaryAbUserSetHeadings,
} from '../../../data/ab.data';
import { ProductCreateDTO } from 'src/product/dto/product-create.dto';

type RowData = Record<string, string | number>;

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

        return await this.proceedFile(file, cur);
    }

    private async proceedFile(
        file: Express.Multer.File,
        cur: string,
    ): Promise<ProductCreateDTO[]> {
        const includeColumns = new RegExp(
            `${Object.values(this.currentSupplierUserSetHeadings).join('|')}`,
            'i',
        );

        const data: ProductCreateDTO[] = [];

        await csv({
            delimiter: ';',
            ignoreEmpty: true,
            trim: true,
            checkType: true,
            checkColumn: true,
            includeColumns,
        })
            .fromString(file.buffer.toString())
            .subscribe(async (csvLine, nr) => {
                const productRow: RowData = this.mapRowForApp(csvLine);

                const objInstance = await this.validatorDto(
                    ProductCreateDTO,
                    {
                        ...productRow,
                        currency: cur,
                    },
                    nr,
                );

                data.push(objInstance);
            })
            .on('error', (err: any) => {
                throw new Error('Error on try to convert csv to data', {
                    cause: err,
                });
            });

        if (data.length === 0) throw new Error('No data');

        return data;
    }

    private async validatorDto<T extends ClassConstructor<any>>(
        dto: T,
        obj: Record<string, any>,
        nr: number,
    ): Promise<InstanceType<T>> {
        const objInstance = plainToClass(dto, obj);
        const errors = await validate(objInstance);
        if (errors.length > 0) {
            throw new BadRequestException(
                this.bulidValidationMessage(errors, nr),
            );
        }
        return objInstance;
    }

    private bulidValidationMessage(errors: any[], nr: number) {
        return errors.map((err) => {
            return `Problem z produktem nr ${nr + 1}: "${
                err.constraints[Object.keys(err.constraints)[0]]
            }". Otrzymana niepoprawna wartość pola: ${err.value}`;
        });
    }

    //     w-firma-integration-api-1       | Server is running on port 3005
    // w-firma-integration-api-1       |  ---->  [
    // w-firma-integration-api-1       |   ValidationError {
    // w-firma-integration-api-1       |     target: ProductCreateDTO {
    // w-firma-integration-api-1       |       supplierIndex: 'AK4WOK00137',
    // w-firma-integration-api-1       |       quantity: undefined,
    // w-firma-integration-api-1       |       netPrice: 103.67,
    // w-firma-integration-api-1       |       currency: 'PLN',
    // w-firma-integration-api-1       |       invoiceNumber: 'A1556815'
    // w-firma-integration-api-1       |     },
    // w-firma-integration-api-1       |     value: undefined,
    // w-firma-integration-api-1       |     property: 'quantity',
    // w-firma-integration-api-1       |     children: [],
    // w-firma-integration-api-1       |     constraints: {
    // w-firma-integration-api-1       |       isNumber: 'quantity must be a number conforming to the specified constraints'
    // w-firma-integration-api-1       |     }
    // w-firma-integration-api-1       |   }
    // w-firma-integration-api-1       | ]

    private mapRowForApp(csvLine: RowData): RowData {
        const newLine = {};
        Object.entries(csvLine).map(([key, value]) => {
            const newKey = this.getAppKey(
                key,
                this.currentSupplierUserSetHeddingsTranslation,
            );
            if (!newKey) throw new Error('No match');
            newLine[newKey] = value;
        });
        return newLine;
    }

    private getAppKey(
        orginalDocKey: string,
        map: Record<string, string>,
    ): string {
        let foundAppKey: string | null = null;
        for (const [settingsKey, vaulue] of Object.entries(map)) {
            const appKey: RegExpMatchArray | null = orginalDocKey.match(
                new RegExp(settingsKey, 'i'),
            );
            if (appKey) {
                foundAppKey = vaulue;
                break;
            }
        }
        if (foundAppKey) return foundAppKey;
        throw new Error('No match');
    }
}
