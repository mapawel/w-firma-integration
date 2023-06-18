import { ProductResDTO } from "@/domains/products/dto/product-res.dto";

export const columns: { heading: string; accessor: keyof ProductResDTO }[] = [
    {
        heading: 'Dostawca',
        accessor: 'supplier',
    },
    {
        heading: 'Nr faktury',
        accessor: 'invoice',
    },
    {
        heading: 'Kod produktu',
        accessor: 'productCode',
    },
    {
        heading: 'Index dostawcy',
        accessor: 'supplierCode',
    },
    {
        heading: 'Ilość',
        accessor: 'quantity',
    },
    {
        heading: 'Cena netto',
        accessor: 'netPrice',
    },
    {
        heading: 'Waluta',
        accessor: 'currency',
    },
    {
        heading: 'Status',
        accessor: 'status',
    },
    {
        heading: 'Dodano',
        accessor: 'addedAt',
    },
];
