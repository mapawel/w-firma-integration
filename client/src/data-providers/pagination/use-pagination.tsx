import { useDataAndDataFilters } from '../filters-data/use-data-and-data-filters';

export const usePagination = () => {
    const options = [
        {
            value: 25,
            label: '25',
        },
        {
            value: 50,
            label: '50',
        },
        {
            value: 100,
            label: '100',
        },
    ];
    const { records, count, setRecords, skip, setSkip } =
        useDataAndDataFilters();

    const lastPageNo = Math.ceil(count / records);

    const handleNext = () => {
        setSkip(skip === (lastPageNo - 1) * records ? skip : skip + records);
    };

    const handlePrev = () => {
        setSkip(skip === 0 ? skip : skip - records);
    };

    const handleFirst = () => {
        setSkip(0);
    };

    const handleLast = () => {
        setSkip((lastPageNo - 1) * records);
    };

    const range: string = `${skip + 1} - ${
        skip + records > count ? count : skip + records
    } `;

    const isMoreThanTwo = count / records > 2;
    const isMoreThanOne = count / records > 1;

    return {
        count,
        setRecords,
        lastPageNo,
        handleNext,
        handlePrev,
        handleFirst,
        handleLast,
        range,
        options,
        isMoreThanTwo,
        isMoreThanOne,
    };
};
