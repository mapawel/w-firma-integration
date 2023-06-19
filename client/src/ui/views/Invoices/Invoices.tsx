import { FC } from 'react';
import NavTemplate from '@/ui/components/templates/Nav-template';
import TableTopHeader from '@/ui/components/organisms/Table-top-header/Table-top-header';
import { DataAndDataFiltersProvider } from '@/data-providers/filters-data/Data-and-data-filters.provider';
import InvoiceTable from '@/ui/components/organisms/Invoice-table/Invoice-table';
import { TablePagination } from '@/ui/components/organisms/Table-pagination/Table-pagination';

const InvoicesView: FC = () => {
    return (
        <DataAndDataFiltersProvider>
            <NavTemplate>
                <div className="inline-block">
                    <TableTopHeader />
                    <TablePagination />
                    <InvoiceTable />
                </div>
            </NavTemplate>
        </DataAndDataFiltersProvider>
    );
};

export default InvoicesView;
