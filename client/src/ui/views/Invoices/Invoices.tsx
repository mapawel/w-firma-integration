import { FC } from 'react';
import NavTemplate from '@/ui/components/templates/Nav-template';
import TableTopHeader from '@/ui/components/organisms/Table-top-header/Table-top-header';
import { DataAndDataFiltersProvider } from '@/data-providers/filters-data/Data-and-data-filters.provider';
import InvoiceTable from '@/ui/components/organisms/Invoice-table/Invoice-table';
import { PaginationProvider } from '@/data-providers/pagination/Pagination-provider';
import { TablePagination } from '@/ui/components/organisms/Table-pagination/Table-pagination';
import { CheckboxesProvider } from '@/data-providers/check-boxes-provider/Check-boxes.provider';

const InvoicesView: FC = () => {
    return (
        <DataAndDataFiltersProvider>
            <PaginationProvider>
                <CheckboxesProvider>
                    <NavTemplate>
                        <TableTopHeader />
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
