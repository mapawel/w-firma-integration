import { FC } from 'react';
import NavTemplate from '@/ui/components/templates/Nav-template';
import { CheckboxesProvider } from '@/data-providers/check-boxes-provider/Check-boxes.provider';
import { SaleDataAndDataFiltersProvider } from '@/data-providers/filters-data-sale/sale-data-and-data-filters.provider';
import SaleTableTopHeader from '@/ui/components/organisms/Sale-table-top-header/Sale-table-top-header';
import SaleTable from '@/ui/components/organisms/Sale-table/Sale-table';
import { PaginationSaleProvider } from '@/data-providers/pagination-sale/Pagination-sale-provider';
import { SaleTablePagination } from '@/ui/components/organisms/Sale-table-pagination/Sale-table-pagination';

const SaleView: FC = () => {
    return (
        <SaleDataAndDataFiltersProvider>
            <PaginationSaleProvider>
                <CheckboxesProvider>
                    <NavTemplate>
                        <SaleTableTopHeader />
                        <SaleTablePagination />
                        <SaleTable />
                        <SaleTablePagination />
                    </NavTemplate>
                </CheckboxesProvider>
            </PaginationSaleProvider>
        </SaleDataAndDataFiltersProvider>
    );
};

export default SaleView;
