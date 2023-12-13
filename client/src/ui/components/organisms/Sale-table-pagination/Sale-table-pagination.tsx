import { FC } from 'react';
import Select from 'react-select';
import { selectStyle } from '../Table-top-header/select-style';
import usePaginationSale from '@/data-providers/pagination-sale/use-pagination-sale';
import SalePaginationButtons from '@/ui/components/organisms/Sale-table-pagination/Sale-pagination-buttons';

export const SaleTablePagination: FC = () => {
    const { range, count, options, records, setRecords } = usePaginationSale();

    return (
        <nav className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0">
            <span className="text-m font-normal text-secondaryLight dark:text-gray-400">
                <span className="font-semibold text-secondary dark:text-white">
                    {range}
                </span>
                {'z '}
                <span className="font-semibold text-secondary dark:text-white">
                    {count}
                </span>
            </span>
            <SalePaginationButtons />
            <div className="flex items-center  gap-3 text-secondaryLight">
                <span className="text-sm">na stronę:</span>
                <form>
                    <Select
                        id="records"
                        options={options}
                        value={{
                            value: records,
                            label: String(records),
                        }}
                        className="w-full"
                        name="status"
                        styles={selectStyle}
                        onChange={(selected) =>
                            setRecords(selected?.value || 50)
                        }
                    />
                </form>
            </div>
        </nav>
    );
};
