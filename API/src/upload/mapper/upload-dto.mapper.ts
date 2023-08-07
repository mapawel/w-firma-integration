import { RowData } from '../types';

export class ProductCreateDtoMapper {
    public static mapFileRowToProductCreateDTO(
        csvLine: RowData,
        currentSupplierUserSetHeddingsTranslation: any,
    ): RowData {
        const newLine = {};
        Object.entries(csvLine).map(([key, value]) => {
            const newKey = this.getEntityKey(
                key,
                currentSupplierUserSetHeddingsTranslation,
            );
            if (!newKey) throw new Error('No match');
            newLine[newKey] = value;
        });

        return newLine;
    }

    private static getEntityKey(
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
