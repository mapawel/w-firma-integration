import { FC } from "react";
import { ReactComponent as Prev } from "@/assets/icons/prev.svg";
import { ReactComponent as Next } from "@/assets/icons/next.svg";
import { paginationButtonBaseStyle } from "../Table-pagination/pagination-button-base-style";
import usePaginationSale from "@/data-providers/pagination-sale/use-pagination-sale";

const PaginationButtons: FC = () => {
    const {
        handlePrev,
        handleNext,
        lastPageNo,
        activePage,
        pageNumbersAvailable,
        handleSwitchPage
    } = usePaginationSale();

    return (
        <ul className="inline-flex items-stretch -space-x-px">
            <li>
                <button
                    onClick={handlePrev}
                    className={
                        "ml-0 h-full rounded-l-lg " + paginationButtonBaseStyle
                    }
                >
                    <Prev className="h-5 w-5 fill-secondaryLight" />
                </button>
            </li>
            <li>
                <button
                    onClick={() => handleSwitchPage(1)}
                    className={`${paginationButtonBaseStyle} ${
                        activePage === 1 && "font-semibold underline"
                    }`}
                >
                    1
                </button>
            </li>

            {pageNumbersAvailable.map((pageNo) => (
                <li key={pageNo}>
                    <button
                        onClick={() => handleSwitchPage(pageNo)}
                        className={`${paginationButtonBaseStyle} ${
                            activePage === pageNo && "font-semibold underline"
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
                        className={`${paginationButtonBaseStyle} ${
                            activePage === lastPageNo &&
                            "font-semibold underline"
                        }`}
                    >
                        {lastPageNo}
                    </button>
                </li>
            )}

            <li>
                <button
                    onClick={handleNext}
                    className={
                        "ml-0 h-full rounded-r-lg " + paginationButtonBaseStyle
                    }
                >
                    <Next className="h-5 w-5 fill-secondaryLight" />
                </button>
            </li>
        </ul>
    );
};
export default PaginationButtons;
