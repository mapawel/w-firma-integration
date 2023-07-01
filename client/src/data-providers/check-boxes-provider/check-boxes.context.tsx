import { createContext } from 'react';

export const CheckboxesContext = createContext<{
    checked: number[];
    setChecked: (ids: number[]) => void;
    areAllChecked: boolean;
    handleCheckboxChange: (id: number) => void;
    handleCheckAll: () => void;
}>({
    checked: [],
    setChecked: (ids: number[]) => {},
    areAllChecked: false,
    handleCheckboxChange: () => {},
    handleCheckAll: () => {},
});
