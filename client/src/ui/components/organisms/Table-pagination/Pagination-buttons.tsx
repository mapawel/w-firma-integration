import { FC } from 'react';
import { ReactComponent as Prev } from '@/assets/icons/prev.svg';
import { ReactComponent as Next } from '@/assets/icons/next.svg';
import usePagination from '@/data-providers/pagination/use-pagination';

const tempBtnStyle =
    'flex items-center justify-center border border-secondaryLight bg-white px-3 py-2.5 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:bg-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';

const PaginationButtons: FC = () => {
    const {
        handlePrev,
        handleNext,
        lastPageNo,
        activePage,
        pageNumbersAvailable,
        handleSwitchPage,
    } = usePagination();

    return (
        <ul className="inline-flex items-stretch -space-x-px">
            <li>
                <button
                    onClick={handlePrev}
                    className="ml-0 flex h-full items-center justify-center rounded-l-lg border border-secondaryLight bg-white px-3 py-2.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:bg-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    <Prev className="h-5 w-5 fill-secondary" />
                </button>
            </li>

            {(() => {
                console.log(
                    'pageNumbersAvailable ----> ',
                    pageNumbersAvailable,
                );
                return <></>;
            })()}

            <li>
                <button
                    onClick={() => handleSwitchPage(1)}
                    className={`${tempBtnStyle} ${
                        activePage === 1 && 'font-semibold'
                    }`}
                >
                    1
                </button>
            </li>

            {pageNumbersAvailable.map((pageNo) => (
                <li key={pageNo}>
                    <button
                        onClick={() => handleSwitchPage(pageNo)}
                        className={`${tempBtnStyle} ${
                            activePage === pageNo && 'font-semibold'
                        }`}
                    >
                        {pageNo}
                    </button>
                </li>
            ))}

            {lastPageNo > 1 && (
                <li>
                    <button
                        onClick={() => handleSwitchPage(lastPageNo)}
                        className={`${tempBtnStyle} ${
                            activePage === lastPageNo && 'font-semibold'
                        }`}
                    >
                        {lastPageNo}
                    </button>
                </li>
            )}

            <li>
                <button
                    onClick={handleNext}
                    className="flex h-full items-center justify-center rounded-r-lg border border-secondaryLight bg-white px-3 py-2.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:bg-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    <Next className="h-5 w-5 fill-secondary" />
                </button>
            </li>
        </ul>
    );
};
export default PaginationButtons;
