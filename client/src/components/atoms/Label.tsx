import { FC } from 'react';
import { ReactComponent as Checked } from '@/assets/icons/checked.svg';

interface LabelProps {
    htmlFor: string;
    label: string;
}

export const Label: FC<LabelProps> = ({ htmlFor, label }) => (
    <label
        htmlFor={htmlFor}
        className="block cursor-pointer rounded-lg border border-secondaryLight p-4 text-sm font-medium shadow-sm hover:border-secondary peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary"
    >
        <div className="flex items-center justify-between">
            <p>{label}</p>

            <Checked />
        </div>
    </label>
);
