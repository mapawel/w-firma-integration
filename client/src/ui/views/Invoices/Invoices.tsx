import { FC } from 'react';
import NavTemplate from '@/ui/components/templates/Nav-template';
import TableTopHeader from '@/ui/components/organisms/Table-top-header/Table-top-header';
import { DataAndDataFiltersProvider } from '@/data-providers/filters-data/Data-and-data-filters.provider';
import InvoiceTable from '@/ui/components/organisms/Invoice-table/Invoice-table';
import { TableBottom } from '@/ui/components/organisms/Table-bottom/Table-bottom';

const InvoicesView: FC = () => {
    return (
        <DataAndDataFiltersProvider>
            <NavTemplate>
                <div className="inline-block">
                    <TableTopHeader />
                    <InvoiceTable />
                    <TableBottom />
                </div>
            </NavTemplate>
        </DataAndDataFiltersProvider>
    );
};

export default InvoicesView;
