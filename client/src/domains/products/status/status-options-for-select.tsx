import { Status } from './status.enum';

type SelectOption = { value: Status; label: Status };

export const statusOptionsForSelect: SelectOption[] = Object.values(Status).map(
    (status) => ({
        value: status,
        label: status,
    }),
);
