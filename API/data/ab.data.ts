export const temporaryAbUserSetHeadings = {
    products: {
        invoiceNumber: 'numer fak',
        supplierCode: 'Inde',
        quantity: 'Ilość',
        netPrice: 'Cena net',
    },
    codes: {
        supplierCode: 'supplierCode',
        PN: 'PN',
    },
    sale: {
        supplierCode: 'Inde',
        quantity: 'Ilość',
        netPrice: 'Cena net',
    },
};

export const temporaryAbUserSetHeddingsTranslation = {
    products: {
        'numer fak': 'invoiceNumber',
        Inde: 'supplierCode',
        Ilość: 'quantity',
        'Cena net': 'netPrice',
    },
    codes: {
        supplierCode: 'supplierCode',
        PN: 'PN',
    },
    sale: {
        Inde: 'supplierCode',
        Ilość: 'quantity',
        'Cena net': 'netPrice',
    },
};

// to translate what is above before putting it into DB
// private mapToAppHeadings(
//     supplierParams: Record<string, string>,
// ): Record<string, string> {
//     const map = {};

//     Object.entries(supplierParams).map(([key, value]) => {
//         map[value] = key;
//     });

//     return map;
// }
