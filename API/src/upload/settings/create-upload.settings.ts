export const createUploadSettings = (currentSupplierUserSetHeadings: any) => {
    const includeColumns = new RegExp(
        `${Object.values(currentSupplierUserSetHeadings).join('|')}`,
        'i',
    );

    return {
        delimiter: ';',
        ignoreEmpty: true,
        trim: true,
        checkType: true,
        checkColumn: true,
        includeColumns,
    };
};
