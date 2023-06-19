import { FC } from 'react';
import NavTemplate from '@/ui/components/templates/Nav-template';
import TableTopHeader from '@/ui/components/organisms/Table-top-header/Table-top-header';
import { DataAndDataFiltersProvider } from '@/data-providers/filters-data/Data-and-data-filters.provider';
import InvoiceTable from '@/ui/components/organisms/Invoice-table/Invoice-table';
import { PaginationProvider } from '@/data-providers/pagination/Pagination-provider';
import { TablePagination } from '@/ui/components/organisms/Table-pagination/Table-pagination';

const InvoicesView: FC = () => {
    return (
        <DataAndDataFiltersProvider>
            <PaginationProvider>
                <NavTemplate>
                    <TableTopHeader />
                    <TablePagination />
                    <InvoiceTable />
                    <TablePagination />
                </NavTemplate>
            </PaginationProvider>
        </DataAndDataFiltersProvider>
    );
};

export default InvoicesView;
