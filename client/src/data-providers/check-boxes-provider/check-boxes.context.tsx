import { createContext } from 'react';

export const CheckboxesContext = createContext<{
    checked: number[];
    areAllChecked: boolean;
    handleCheckboxChange: (id: number) => void;
    handleCheckAll: () => void;
}>({
    checked: [],
    areAllChecked: false,
    handleCheckboxChange: () => {},
    handleCheckAll: () => {},
});
