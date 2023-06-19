import { FC } from 'react';
import Select from 'react-select';
import { selectStyle } from '../Table-top-header/select-style';
import { ReactComponent as Prev } from '@/assets/icons/prev.svg';
import { ReactComponent as Next } from '@/assets/icons/next.svg';
import { usePagination } from '@/data-providers/pagination/use-pagination';

export const TablePagination: FC = () => {
    const {
        count,
        setRecords,
        lastPageNo,
        handleNext,
        handlePrev,
        handleFirst,
        handleLast,
        range,
        options,
        isMoreThanTwo,
        isMoreThanOne,
    } = usePagination();

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
            <ul className="inline-flex items-stretch -space-x-px">
                <li>
                    <button
                        onClick={handlePrev}
                        className="ml-0 flex h-full items-center justify-center rounded-l-lg border border-secondaryLight bg-white px-3 py-2.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <Prev className="h-5 w-5 fill-secondary" />
                    </button>
                </li>

                <li>
                    <button
                        onClick={handleFirst}
                        className="flex items-center justify-center border border-secondaryLight bg-white px-3 py-2.5 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        1
                    </button>
                </li>

                {isMoreThanTwo && (
                    <li>
                        <button className="flex items-center justify-center border border-secondaryLight bg-white px-3 py-2.5 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            ...
                        </button>
                    </li>
                )}
                {isMoreThanOne && (
                    <li>
                        <button
                            onClick={handleLast}
                            className="flex items-center justify-center border border-secondaryLight bg-white px-3 py-2.5 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            {lastPageNo}
                        </button>
                    </li>
                )}

                <li>
                    <button
                        onClick={handleNext}
                        className="flex h-full items-center justify-center rounded-r-lg border border-secondaryLight bg-white px-3 py-2.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <Next className="h-5 w-5 fill-secondary" />
                    </button>
                </li>
            </ul>
            <div className="flex items-center gap-3 text-secondaryLight">
                <span className="text-sm">na stronę:</span>
                <form>
                    <Select
                        options={options}
                        defaultValue={{
                            value: 50,
                            label: '50',
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
