import { FC } from 'react';
import { toFixedNum } from '@/global-helpers/to-fixed-num';
import { ReactComponent as Triangle } from '@/assets/icons/triangle.svg';
import { getFormattedDateAndTime } from '@/global-helpers/get-formatted-date-and-time';
import { useDataAndDataFilters } from '@/data-providers/filters-data/use-data-and-data-filters';
import { columns } from './columns.data';

const InvoiceTable: FC = () => {
    const { data, sortParam, sortDirect, handleSort } = useDataAndDataFilters();

    return (
        <div className="overflow-hidden rounded-xl border border-primary">
            <table className="border-collapse">
                <thead className="bg-primary ">
                    <tr>
                        <th></th>
                        {columns.map(({ heading, accessor }) => (
                            <th
                                key={accessor}
                                id={accessor}
                                className="px-5 py-1 font-semibold text-white"
                            >
                                <button onClick={() => handleSort(accessor)}>
                                    <Triangle
                                        className={`mr-3 inline-block h-4 w-4 fill-white ${
                                            sortParam === accessor &&
                                            sortDirect === 'DESC' &&
                                            'rotate-90'
                                        } ${
                                            sortParam === accessor &&
                                            sortDirect === 'ASC' &&
                                            'rotate-[-90deg]'
                                        }`}
                                    />
                                </button>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map(
                        ({
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
                        }) => (
                            <tr
                                key={id}
                                className="border-t-[1px] border-primary"
                            >
                                <td className="flex h-10 items-center justify-center px-5 py-1">
                                    <input
                                        id={id.toString()}
                                        type="checkbox"
                                        value=""
                                        className="h-6 w-6 rounded border-secondary bg-white focus:ring-1"
                                    />
                                </td>
                                <td className="border-l-[1px] border-primary px-5 py-1">
                                    {supplier}
                                </td>
                                <td className="border-l-[1px] border-primary px-5 py-1">
                                    {invoice}
                                </td>
                                <td className="border-l-[1px] border-primary px-5 py-1">
                                    {productCode}
                                </td>
                                <td className="border-l-[1px] border-primary px-5 py-1">
                                    {supplierCode}
                                </td>
                                <td className="border-l-[1px] border-primary px-5 py-1 text-right">
                                    {quantity}
                                </td>
                                <td className="border-l-[1px] border-primary px-5 py-1 text-right">
                                    {toFixedNum(netPrice, 2)}
                                </td>
                                <td className="border-l-[1px] border-primary px-5 py-1">
                                    {currency}
                                </td>
                                <td className="border-l-[1px] border-primary px-5 py-1">
                                    {status}
                                </td>
                                <td className="border-l-[1px] border-primary px-5 py-1">
                                    {getFormattedDateAndTime(addedAt)}
                                </td>
                            </tr>
                        ),
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceTable;
