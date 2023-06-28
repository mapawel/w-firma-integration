import { Status } from '@/domains/products/status/status.enum';
import { statusOptionsTranslations } from '@/domains/products/status/status-options-translations';

export const StatusBadge = ({ status }: { status: Status }) => {
    const statusColor = {
        [Status.SUCCESS]: 'bg-success',
        [Status.ERROR]: 'bg-cta',
        [Status.NEW]: 'bg-primary',
        [Status.NEW_WARN]: 'bg-warn',
    };

    return (
        <span
            className={`m-auto inline-flex rounded-full px-2 text-xs font-semibold leading-5 text-white ${statusColor[status]}`}
        >
            {statusOptionsTranslations[status]}
        </span>
    );
};
