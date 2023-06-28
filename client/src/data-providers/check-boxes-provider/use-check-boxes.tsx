import { useContext } from 'react';
import { CheckboxesContext } from './check-boxes.context';

export const useCheckboxes = () => {
    return useContext(CheckboxesContext);
};
