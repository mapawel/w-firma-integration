import { FC } from 'react';
import NavTemplate from '@/ui/components/templates/Nav-template';
import { CheckboxesProvider } from '@/data-providers/check-boxes-provider/Check-boxes.provider';
import { SaleDataAndDataFiltersProvider } from '@/data-providers/filters-data-sale/sale-data-and-data-filters.provider';
import SaleTableTopHeader from '@/ui/components/organisms/Table-top-headers/Sale/Sale-table-top-header';
import SaleTable from '@/ui/components/organisms/Tables-body/Sale/Sale-table';
import { TablePagination } from '@/ui/components/organisms/Table-pagination/Table-pagination';
import { PaginationProvider } from '@/data-providers/pagination/Pagination-provider';
import { useSaleDataAndDataFilters } from '@/data-providers/filters-data-sale/use-sale-data-and-data-filters';

const SaleView: FC = () => {
    return (
        <SaleDataAndDataFiltersProvider>
            <PaginationProvider useData={useSaleDataAndDataFilters}>
                <CheckboxesProvider useData={useSaleDataAndDataFilters}>
                    <NavTemplate>
                        <SaleTableTopHeader />
                        <TablePagination />
                        <SaleTable />
                        <TablePagination />
                    </NavTemplate>
                </CheckboxesProvider>
            </PaginationProvider>
        </SaleDataAndDataFiltersProvider>
    );
};

export default SaleView;
