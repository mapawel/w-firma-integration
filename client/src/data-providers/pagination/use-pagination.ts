import { useContext } from 'react';
import { PaginationContext } from './Pagination.context';

const usePagination = () => useContext(PaginationContext);

export default usePagination;
