import { Status } from './status.enum';
import { statusOptionsTranslations } from './status-options-translations';

type SelectOption = {
    value: Status | 'all';
    label: (typeof statusOptionsTranslations)[keyof typeof statusOptionsTranslations];
};

export const statusOptionsForSelect: SelectOption[] = Object.entries(
    statusOptionsTranslations,
).map(([value, label]) => ({
    value: value as Status,
    label,
}));
