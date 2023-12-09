import { FC } from 'react';
import { toFixedNum } from '@/global-helpers/to-fixed-num';
import { ProductType } from '@/ui/views/Upload-result/Product.type';
import { UploadTypeEnum } from '@/ui/views/Upload/data/Upload-type.enum';

interface IProps {
    data: any;
    viewType: UploadTypeEnum;
}

const ProductTable: FC<IProps> = ({ data, viewType }) => (
    <div className="inline-block overflow-hidden rounded-xl border border-primary">
        <table className="border-collapse">
            <thead className="bg-primary ">
                <tr>
                    {viewType === UploadTypeEnum.PRODUCTS && (
                        <th className="px-5 py-1 font-semibold">Nr faktury</th>
                    )}
                    <th className="px-5 py-1 font-semibold">Index dostawcy</th>
                    <th className="px-5 py-1 font-semibold">Ilość szt</th>
                    <th className="px-5 py-1 font-semibold">Cena netto</th>
                    <th className="px-5 py-1 font-semibold">Waluta</th>
                </tr>
            </thead>
            <tbody>
                {data?.map(
                    (
                        {
                            supplierCode,
                            quantity,
                            netPrice,
                            currency,
                            invoiceNumber,
                        }: ProductType,
                        index: number,
                    ) => (
                        <tr
                            key={index}
                            className="border-t-[1px] border-primary"
                        >
                            {viewType === UploadTypeEnum.PRODUCTS && (
                                <td className="px-5 py-1">{invoiceNumber}</td>
                            )}
                            <td
                                className={`px-5 py-1 ${
                                    viewType === UploadTypeEnum.PRODUCTS &&
                                    'border-l-[1px] border-primary'
                                }`}
                            >
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
                        </tr>
                    ),
                )}
            </tbody>
        </table>
    </div>
);

export default ProductTable;
