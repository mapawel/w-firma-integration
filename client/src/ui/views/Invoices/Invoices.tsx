import { FC } from 'react';
import NavTemplate from '@/ui/components/templates/Nav-template';
import InvoicesTableTopHeader from '@/ui/components/organisms/Table-top-headers/Invoices/Invoices-table-top-header';
import { DataAndDataFiltersProvider } from '@/data-providers/filters-data/Data-and-data-filters.provider';
import InvoiceTable from '@/ui/components/organisms/Tables-body/Invoices/Invoice-table';
import { PaginationProvider } from '@/data-providers/pagination/Pagination-provider';
import { TablePagination } from '@/ui/components/organisms/Table-pagination/Table-pagination';
import { CheckboxesProvider } from '@/data-providers/check-boxes-provider/Check-boxes.provider';
import { useDataAndDataFilters } from '@/data-providers/filters-data/use-data-and-data-filters';

const InvoicesView: FC = () => {
    return (
        <DataAndDataFiltersProvider>
            <PaginationProvider useData={useDataAndDataFilters}>
                <CheckboxesProvider useData={useDataAndDataFilters}>
                    <NavTemplate>
                        <InvoicesTableTopHeader />
                        <TablePagination />
                        <InvoiceTable />
                        <TablePagination />
                    </NavTemplate>
                </CheckboxesProvider>
            </PaginationProvider>
        </DataAndDataFiltersProvider>
    );
};

export default InvoicesView;
