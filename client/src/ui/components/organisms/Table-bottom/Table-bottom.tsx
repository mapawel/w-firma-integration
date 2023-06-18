import { FC } from 'react';
import { useDataAndDataFilters } from '@/data-providers/filters-data/use-data-and-data-filters';
import Select from 'react-select';
import { selectStyle } from '../Table-top-header/select-style';
import { ReactComponent as Prev } from '@/assets/icons/prev.svg';
import { ReactComponent as Next } from '@/assets/icons/next.svg';

export const TableBottom: FC = () => {
    const { records, count, setRecords, skip, setSkip } =
        useDataAndDataFilters();
    const lastPageNo = Math.ceil(count / records);

    return (
        <nav className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">
                    {`${skip + 1} - ${
                        skip + records > count ? count : skip + records
                    } `}
                </span>
                {'z '}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {count}
                </span>
            </span>
            <form>
                <Select
                    options={[
                        {
                            value: 25,
                            label: '25',
                        },
                        {
                            value: 50,
                            label: '50',
                        },
                    ]}
                    defaultValue={{
                        value: 50,
                        label: '50',
                    }}
                    className="w-full"
                    name="status"
                    placeholder="Rekordów na stronę..."
                    styles={selectStyle}
                    onChange={(selected) => setRecords(selected?.value || 50)}
                />
            </form>
            <ul className="inline-flex items-stretch -space-x-px">
                <li>
                    <button
                        onClick={() => {
                            setSkip(skip === 0 ? skip : skip - records);
                        }}
                        className="ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <Prev className="h-5 w-5 fill-secondary" />
                    </button>
                </li>

                <li>
                    <button
                        onClick={() => {
                            setSkip(0);
                        }}
                        className="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        1
                    </button>
                </li>

                {count / records > 2 && (
                    <li>
                        <button className="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            ...
                        </button>
                    </li>
                )}
                {count / records > 1 && (
                    <li>
                        <button
                            onClick={() => {
                                setSkip((lastPageNo - 1) * records);
                            }}
                            className="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            {lastPageNo}
                        </button>
                    </li>
                )}

                <li>
                    <button
                        onClick={() => {
                            setSkip(
                                skip === (lastPageNo - 1) * records
                                    ? skip
                                    : skip + records,
                            );
                        }}
                        className="flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <Next className="h-5 w-5 fill-secondary" />
                    </button>
                </li>
            </ul>
        </nav>
    );
};
