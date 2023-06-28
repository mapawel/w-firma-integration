import { FC } from 'react';
import { toFixedNum } from '@/global-helpers/to-fixed-num';
import { ReactComponent as Triangle } from '@/assets/icons/triangle.svg';
import { getFormattedDateAndTime } from '@/global-helpers/get-formatted-date-and-time';
import { useDataAndDataFilters } from '@/data-providers/filters-data/use-data-and-data-filters';
import { columns } from './columns.data';
import { Status } from '@/domains/products/status/status.enum';
import { StatusBadge } from '../../atoms/Status-badge';
import { useCheckboxes } from '@/data-providers/check-boxes-provider/use-check-boxes';

const InvoiceTable: FC = () => {
    const { data, sortParam, sortDirect, handleSort, skip } =
        useDataAndDataFilters();

    const { checked, areAllChecked, handleCheckboxChange, handleCheckAll } =
        useCheckboxes();

    return (
        <div className="inline-block overflow-hidden rounded-xl border border-primary">
            <table className="m-[-1px] min-w-[1200px] border-collapse">
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
                                        className={`${
                                            sortParam === accessor
                                                ? sortDirect === 'DESC'
                                                    ? 'mr-3 inline-block h-4 w-4 rotate-90 fill-red-300'
                                                    : 'mr-3 inline-block h-4 w-4 rotate-[-90deg] fill-red-300'
                                                : 'mr-3 inline-block h-4 w-4 fill-white'
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
                                    <td className=" border border-primary px-5 py-1 text-center">
                                        <StatusBadge status={status} />
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
