import { FC } from 'react';
import { ReactComponent as CollapseArrow } from '@/assets/icons/collapse-arrow.svg';
// import { ReactComponent as Filter } from '@/assets/icons/filter.svg';
import { TableDropdown } from '@/ui/components/molecules/Table-dropdown';
import Select from 'react-select';
import { Status } from '@/domains/products/status/status.enum';
import { selectStyle } from './select-style';
import { statusOptionsForSelect as statusOptions } from '@/domains/products/status/status-options-for-select';
import { useDataAndDataFilters } from '@/data-providers/filters-data/use-data-and-data-filters';

const mockOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const TableTopHeader: FC = () => {
    const { isDropdownOpen, setDropdownOpen, buttonRef, handlers } =
        useDataAndDataFilters();

    return (
        <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="w-full md:w-3/4">
                <form className="flex items-center gap-4">
                    <Select
                        isMulti
                        options={mockOptions}
                        className="w-full"
                        name="invoice"
                        placeholder="Faktury..."
                        styles={selectStyle}
                    />
                    <Select
                        options={statusOptions}
                        className="w-full"
                        name="status"
                        placeholder="Status..."
                        styles={selectStyle}
                        onChange={(selected) =>
                            handlers.setFilterStatus(
                                selected?.value || Status.all,
                            )
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
                        className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-secondaryLight p-4 text-[12px] text-sm font-medium text-secondary shadow-sm hover:border-primary hover:bg-primary hover:text-white focus:border-primary focus:bg-primary focus:text-white md:w-auto [&:focus>svg]:fill-white [&:hover>svg]:fill-white"
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
