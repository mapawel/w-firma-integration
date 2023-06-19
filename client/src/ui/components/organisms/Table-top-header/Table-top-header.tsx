import { FC } from 'react';
import { ReactComponent as CollapseArrow } from '@/assets/icons/collapse-arrow.svg';
// import { ReactComponent as Filter } from '@/assets/icons/filter.svg';
import { TableDropdown } from '@/ui/components/molecules/Table-dropdown';
import Select from 'react-select';
import { Status } from '@/domains/products/status/status.enum';
import { selectStyle } from './select-style';
import { statusOptionsForSelect as statusOptions } from '@/domains/products/status/status-options-for-select';
import { useDataAndDataFilters } from '@/data-providers/filters-data/use-data-and-data-filters';

const TableTopHeader: FC = () => {
    const {
        isDropdownOpen,
        setDropdownOpen,
        buttonRef,
        setFilterInvoice,
        setFilterStatus,
        uniqueInvoices,
    } = useDataAndDataFilters();

    return (
        <div className="mb-10 flex flex-col items-center justify-between space-y-3 rounded-lg border-primary p-4 shadow-md md:flex-row md:space-x-4 md:space-y-0">
            <div className="w-full md:w-3/4">
                <form className="flex items-center gap-4">
                    <Select
                        options={[
                            {
                                value: 'all',
                                label: 'all',
                            },
                            ...uniqueInvoices.map((invoice) => ({
                                value: invoice,
                                label: invoice,
                            })),
                        ]}
                        className="w-full"
                        name="invoice"
                        placeholder="Faktura..."
                        styles={selectStyle}
                        onChange={(selected) =>
                            setFilterInvoice(selected?.value || 'all')
                        }
                    />
                    <Select
                        options={statusOptions}
                        className="w-full"
                        name="status"
                        placeholder="Status..."
                        styles={selectStyle}
                        onChange={(selected) =>
                            setFilterStatus(selected?.value || Status.all)
                        }
                    />
                </form>
            </div>
            <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                <div className="relative flex w-full items-center space-x-3 md:w-auto">
                    <button
                        ref={buttonRef}
                        id="actionsDropdownButton"
                        data-dropdown-toggle="actionsDropdown"
                        className="flex w-full cursor-pointer items-center justify-center rounded-md border border-secondaryLight px-5 py-2 text-sm font-medium text-secondary shadow-sm transition duration-150 hover:border-primary hover:bg-primary hover:text-white focus:border-primary focus:bg-primary focus:text-white md:w-auto [&:focus>svg]:fill-white [&:hover>svg]:fill-white"
                        type="button"
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                    >
                        <CollapseArrow className="h-7 w-7 fill-secondary" />
                        Actions
                    </button>

                    <TableDropdown isDropdownOpen={isDropdownOpen} />
                </div>
            </div>
        </div>
    );
};

export default TableTopHeader;
