import { FC } from 'react';
import { ReactComponent as CollapseArrow } from '@/assets/icons/collapse-arrow.svg';
import { TableDropdown } from '@/ui/components/molecules/Table-dropdown';
import Select from 'react-select';
import { selectStyle } from './select-style';
import { statusOptionsForSelect as statusOptions } from '@/domains/products/status/status-options-for-select';
import { useSaleDataAndDataFilters } from '@/data-providers/filters-data-sale/use-sale-data-and-data-filters';

const SaleTableTopHeader: FC = () => {
    const {
        isDropdownOpen,
        setDropdownOpen,
        buttonRef,
        setFilterReservationId,
        setFilterStatus,
        uniqueReservationIds,
    } = useSaleDataAndDataFilters();

    return (
        <div className="mb-10 flex flex-col items-center justify-between space-y-3 rounded-lg border-primary p-4 shadow-md md:flex-row md:space-x-4 md:space-y-0">
            <div className="w-full md:w-3/4">
                <form className="flex items-center gap-4">
                    <Select
                        id="invoice"
                        options={[
                            {
                                value: 'all',
                                label: 'all',
                            },
                            ...uniqueReservationIds.map((resId) => ({
                                value: resId,
                                label: resId,
                            })),
                        ]}
                        className="w-full"
                        name="invoice"
                        placeholder="Rezerwacja..."
                        styles={selectStyle}
                        onChange={(selected) =>
                            setFilterReservationId(selected?.value || 'all')
                        }
                    />
                    <Select
                        id="status"
                        options={statusOptions}
                        className="w-full"
                        name="status"
                        placeholder="Status..."
                        styles={selectStyle}
                        onChange={(selected) =>
                            setFilterStatus(selected?.value || 'all')
                        }
                    />
                </form>
            </div>
            <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                <div className="relative flex w-full items-center space-x-3 md:w-auto">
                    <button
                        ref={buttonRef}
                        className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white shadow-sm transition duration-150 hover:border-primary hover:bg-primaryHover hover:text-white focus:border-primary focus:bg-primary focus:text-white
                        md:w-auto [&:focus>svg]:fill-white [&:hover>svg]:fill-white"
                        type="button"
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                    >
                        <CollapseArrow className="h-7 w-7 fill-white" />
                        Actions
                    </button>

                    <TableDropdown isDropdownOpen={isDropdownOpen} />
                </div>
            </div>
        </div>
    );
};

export default SaleTableTopHeader;
