import { Injectable } from '@nestjs/common';
import * as csv from 'csvtojson/v2';
import {
    temporaryAbUserSetHeddingsTranslation,
    temporaryAbUserSetHeadings,
} from '../../../data/ab.data';

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

        return await this.proceedFile(file);
    }

    private async proceedFile(file: Express.Multer.File): Promise<RowData[]> {
        const includeColumns = new RegExp(
            `${Object.values(this.currentSupplierUserSetHeadings).join('|')}`,
            'i',
        );

        const data: RowData[] = [];

        await csv({
            delimiter: ';',
            ignoreEmpty: true,
            trim: true,
            checkType: true,
            checkColumn: true,
            includeColumns,
        })
            .fromString(file.buffer.toString())
            .subscribe((csvLine) => {
                data.push(this.mapRowForApp(csvLine));
            })
            .on('error', (err: any) => {
                throw new Error('Error on try to convert csv to data', {
                    cause: err,
                });
            });

        if (data.length === 0) throw new Error('No data');
        if (!this.isDataComplete(data[0]))
            throw new Error('Data is not complete');

        return data;
    }

    private isDataComplete(data: RowData): boolean {
        return (
            data.hasOwnProperty('invoiceNumber') &&
            data.hasOwnProperty('supplierIndex') &&
            data.hasOwnProperty('quantity') &&
            data.hasOwnProperty('netPrice')
        );
    }

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
