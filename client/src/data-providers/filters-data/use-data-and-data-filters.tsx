import { useContext } from 'react';
import { DataAndDataFiltersCtx } from './filters-data.condext';

export const useDataAndDataFilters = () => {
    return useContext(DataAndDataFiltersCtx);
};
