import { PaginationContext } from './Pagination.context';
import { options } from './pagination-options';
import { useDataAndDataFilters } from '../filters-data/use-data-and-data-filters';
import { FC, useEffect, useMemo, useState } from 'react';

interface IProps {
    children: React.ReactNode;
}

export const PaginationProvider: FC<IProps> = ({ children }) => {
    const { records, count, setRecords, skip, setSkip } =
        useDataAndDataFilters();
    const lastPageNo: number = Math.ceil(count / records);
    const range: string = `${skip + 1} - ${
        skip + records > count ? count : skip + records
    } `;

    const [activePage, setActivePage] = useState<number>(1);

    const handleNext = (): void => {
        setSkip(skip === (lastPageNo - 1) * records ? skip : skip + records);
    };

    const handlePrev = (): void => {
        setSkip(skip === 0 ? skip : skip - records);
    };

    const handleSwitchPage = (pageNo: number): void => {
        if (pageNo < 1 || pageNo > lastPageNo) return;
        setActivePage(pageNo);
        setSkip((pageNo - 1) * records);
    };

    useEffect(() => {
        setActivePage(Math.ceil(skip / records) + 1);
    }, [skip, records]);

    const pageNumbersAvailable = useMemo(() => {
        const pages = [];

        if (activePage >= 4 && lastPageNo > 6) {
            for (let i = activePage - 1; i < lastPageNo; i++) {
                if (i > activePage + 2) break;
                pages.push(i);
            }
        } else {
            for (let i = 2; i < lastPageNo; i++) {
                if (i > 5) break;
                pages.push(i);
            }
        }

        return pages;
    }, [activePage, lastPageNo]);

    return (
        <PaginationContext.Provider
            value={{
                count,
                records,
                lastPageNo,
                range,
                options,
                pageNumbersAvailable,
                activePage,
                setRecords,
                handleNext,
                handlePrev,
                handleSwitchPage,
            }}
        >
            {children}
        </PaginationContext.Provider>
    );
};
