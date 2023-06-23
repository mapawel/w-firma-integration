import { Status } from './status.enum';

export const statusOptionsTranslations = {
    [Status.SUCCESS]: 'DODANE',
    [Status.ERROR]: 'BŁAD DODAWANIA',
    [Status.NEW]: 'OCZEKUJE',
    [Status.NEW_WARN]: 'WYMAGA EDYCJI',
    all: 'KAŻDY STATUS',
};
