import { useContext } from "react";
import { SaleDataAndDataFiltersCtx } from "@/data-providers/filters-data-sale/filters-sale-data.context";

export const useSaleDataAndDataFilters = () => {
    return useContext(SaleDataAndDataFiltersCtx);
};
