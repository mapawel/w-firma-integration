import { useContext } from 'react';
import { DataAndDataFiltersCtx } from './filters-data.context';

export const useDataAndDataFilters = () => {
    return useContext(DataAndDataFiltersCtx);
};
