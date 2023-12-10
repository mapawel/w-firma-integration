import { createContext } from "react";

export const PaginationSaleContext = createContext<{
    count: number;
    records: number;
    lastPageNo: number;
    range: string;
    options: { value: number; label: string }[];
    activePage: number;
    pageNumbersAvailable: number[];
    setRecords: (value: number) => void;
    handleNext: () => void;
    handlePrev: () => void;
    handleSwitchPage: (pageNo: number) => void;
}>({
    count: 0,
    records: 0,
    lastPageNo: 0,
    range: "",
    options: [],
    activePage: 1,
    pageNumbersAvailable: [],
    setRecords: () => {
    },
    handleNext: () => {
    },
    handlePrev: () => {
    },
    handleSwitchPage: () => {
    }
});
