import { SaleProductResDTO } from '@/domains/sale-upload/dto/sale-products-res.dto';

export const columns: { heading: string; accessor: keyof SaleProductResDTO }[] =
    [
        {
            heading: 'id klienta',
            accessor: 'customerId',
        },
        {
            heading: 'Nr rezerwacji',
            accessor: 'reservationId',
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
