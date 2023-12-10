import { useContext } from "react";
import { PaginationSaleContext } from "./Pagination-sale.context";

const usePaginationSale = () => useContext(PaginationSaleContext);

export default usePaginationSale;
