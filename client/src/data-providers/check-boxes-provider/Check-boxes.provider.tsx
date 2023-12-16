import { Status } from "@/domains/products/status/status.enum";
import { FC, useMemo, useState } from "react";
import { CheckboxesContext } from "./check-boxes.context";

interface IProps {
    children: React.ReactNode;
    useData: () => any;
}

export const CheckboxesProvider: FC<IProps> = ({ children, useData }) => {
    const { data }: { data: { id: number; status: Status }[] } = useData();

    const allCheckableIds: number[] = useMemo(
        () =>
            data
                .map(({ id, status }: { id: number; status: Status }) =>
                    status !== Status.SUCCESS ? id : null
                )
                .filter((item: number | null) => item !== null) as number[],
        [data]
    );

    const [checked, setChecked] = useState<number[]>([]);
    const [areAllChecked, setAllChecked] = useState<boolean>(false);

    const handleCheckboxChange = (id: number) => {
        if (checked.includes(id)) {
            setChecked((prev) => prev.filter((item) => item !== id));
        } else {
            setChecked((prev) => [...prev, id]);
        }
    };

    const handleCheckAll = () => {
        setChecked((prev) => {
            if (prev.length === allCheckableIds.length) {
                setAllChecked(false);
                return [];
            }
            setAllChecked(true);
            return allCheckableIds;
        });
    };

    const turnOffAllChecked = () => {
        setChecked([]);
        if (areAllChecked) setAllChecked(false);
    };

    return (
        <CheckboxesContext.Provider
            value={{
                checked,
                setChecked,
                areAllChecked,
                handleCheckboxChange,
                handleCheckAll,
                turnOffAllChecked
            }}
        >
            {children}
        </CheckboxesContext.Provider>
    );
};
