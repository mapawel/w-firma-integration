import { FC } from 'react';
import { useDataAndDataFilters } from '@/data-providers/filters-data/use-data-and-data-filters';
import Select from 'react-select';
import { selectStyle } from '../Table-top-header/select-style';

export const TableBottom: FC = () => {
    const { records, count, setRecords, skip, setSkip } =
        useDataAndDataFilters();

    return (
        <nav className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">
                    {`1 - ${records} `}
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
            {/* <ul className="inline-flex items-stretch -space-x-px">
                <li>
                    <a
                        href="http://localhost:3000/invoices"
                        className="ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Poprzednie</span>
                        <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href="http://"
                        className="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        1
                    </a>
                </li>
                <li>
                    <a
                        href="http://"
                        className="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        2
                    </a>
                </li>
                <li>
                    <a
                        href="http://"
                        aria-current="page"
                        className="text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 z-10 flex items-center justify-center border px-3 py-2 text-sm leading-tight dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                        3
                    </a>
                </li>
                <li>
                    <a
                        href="http://"
                        className="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        ...
                    </a>
                </li>
                <li>
                    <a
                        href="http://"
                        className="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        100
                    </a>
                </li>
                <li>
                    <a
                        href="http://"
                        className="flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Następna</span>
                        <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                        </svg>
                    </a>
                </li>
            </ul> */}
        </nav>
    );
};
