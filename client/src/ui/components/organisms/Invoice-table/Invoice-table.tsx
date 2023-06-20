import { FC, useState } from 'react';
import { toFixedNum } from '@/global-helpers/to-fixed-num';
import { ReactComponent as Triangle } from '@/assets/icons/triangle.svg';
import { getFormattedDateAndTime } from '@/global-helpers/get-formatted-date-and-time';
import { useDataAndDataFilters } from '@/data-providers/filters-data/use-data-and-data-filters';
import { columns } from './columns.data';
import { Status } from '@/domains/products/status/status.enum';

const InvoiceTable: FC = () => {
    const { data, sortParam, sortDirect, handleSort, skip } =
        useDataAndDataFilters();
    const allCheckableIds: number[] = data
        .map(({ id, status }: { id: number; status: Status }) =>
            status !== Status.SUCCESS ? id : null,
        )
        .filter((item: number | null) => item !== null) as number[];

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

    return (
        <div className="inline-block overflow-hidden rounded-xl border border-primary">
            <table className="m-[-1px] min-w-[1135px] border-collapse">
                <thead className=" bg-primary">
                    <tr>
                        <th className=" border border-primary">
                            <input
                                type="checkbox"
                                checked={areAllChecked}
                                onChange={handleCheckAll}
                                className="h-6 w-6 cursor-pointer appearance-none rounded border border-secondaryLight bg-white checked:bg-cta"
                            />
                        </th>
                        <th className="border border-primary px-5 py-1 font-semibold text-white">
                            Lp.
                        </th>
                        {columns.map(({ heading, accessor }) => (
                            <th
                                key={accessor}
                                id={accessor}
                                className="border border-primary px-5 py-1 font-semibold text-white"
                            >
                                <button onClick={() => handleSort(accessor)}>
                                    <Triangle
                                        className={`mr-3 inline-block h-4 w-4 fill-white ${
                                            sortParam === accessor &&
                                            sortDirect === 'DESC' &&
                                            'rotate-90 fill-red-300'
                                        } ${
                                            sortParam === accessor &&
                                            sortDirect === 'ASC' &&
                                            'rotate-[-90deg] fill-red-300'
                                        }`}
                                    />
                                </button>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="">
                    {data?.map(
                        (
                            {
                                id,
                                supplierCode,
                                productCode,
                                quantity,
                                netPrice,
                                currency,
                                invoice,
                                supplier,
                                status,
                                addedAt,
                            },
                            index,
                        ) => {
                            return (
                                <tr
                                    key={id}
                                    className={
                                        checked.includes(id)
                                            ? 'bg-gray-200 dark:bg-gray-800'
                                            : ''
                                    }
                                >
                                    <td className="relative border border-primary px-5 py-1 ">
                                        {status !== Status.SUCCESS && (
                                            <input
                                                id={id.toString()}
                                                type="checkbox"
                                                checked={checked.includes(id)}
                                                onChange={() =>
                                                    handleCheckboxChange(id)
                                                }
                                                className="h-6 w-6 cursor-pointer appearance-none rounded border border-secondaryLight bg-white checked:bg-cta"
                                            />
                                        )}
                                    </td>
                                    <td className=" border border-primary px-5 py-1">
                                        {skip + index + 1}
                                    </td>
                                    <td className=" border border-primary px-5 py-1">
                                        {supplier}
                                    </td>
                                    <td className=" border border-primary px-5 py-1">
                                        {invoice}
                                    </td>
                                    <td className=" border border-primary px-5 py-1">
                                        {productCode}
                                    </td>
                                    <td className=" border border-primary px-5 py-1">
                                        {supplierCode}
                                    </td>
                                    <td className=" border border-primary px-5 py-1 text-right">
                                        {quantity}
                                    </td>
                                    <td className=" border border-primary px-5 py-1 text-right">
                                        {toFixedNum(netPrice, 2)}
                                    </td>
                                    <td className=" border border-primary px-5 py-1">
                                        {currency}
                                    </td>
                                    <td className=" border border-primary px-5 py-1">
                                        {status}
                                    </td>
                                    <td className=" border border-primary px-5 py-1">
                                        {getFormattedDateAndTime(addedAt)}
                                    </td>
                                </tr>
                            );
                        },
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceTable;
