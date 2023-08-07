import { FC } from 'react';
import { toFixedNum } from '@/global-helpers/to-fixed-num';
import { UploadProductsResDTO } from '@/ui/views/Upload-result/Upload-prods-result.type';
import ProductTable from './Product-table';

interface IProps {
    uploadResult: UploadProductsResDTO;
    handleCreateOrders: () => void;
    handleSaveToDB: () => void;
    handleCancel: () => void;
}

export const UploadResultInside: FC<IProps> = ({
    uploadResult,
    handleCreateOrders,
    handleSaveToDB,
    handleCancel,
}) => {
    const {
        data = [],
        totalPositions = 0,
        totalQty = 0,
        totalValue = 0,
    } = uploadResult;
    return (
        <>
            <h1 className="mb-4 text-2xl font-semibold">
                Odczytano z załadowanego pliku:
            </h1>
            <div className="mb-8 flex gap-10">
                <div>
                    <h3 className="text-xl">Dostawca:</h3>
                    <h3 className="text-xl">Ilość pozycji:</h3>
                    <h3 className="text-xl">Ilość szt:</h3>
                    <h3 className="text-xl">Wartość:</h3>
                </div>
                <div>
                    <p className="text-right text-xl font-semibold">
                        {data?.[0].supplier.toUpperCase()}
                    </p>
                    <p className="text-right text-xl font-semibold">
                        {toFixedNum(totalPositions, 0)}
                    </p>
                    <p className="text-right text-xl font-semibold">
                        {toFixedNum(totalQty, 0)}
                    </p>
                    <div className="relative">
                        <p className="text-right text-xl font-semibold">
                            {toFixedNum(totalValue, 2)}
                        </p>
                        <span className="absolute left-[100%] top-0 ml-2 text-xl font-semibold">
                            {data[0]?.currency}
                        </span>
                    </div>
                </div>
            </div>
            <div className="mb-10 flex gap-4">
                <button
                    className="rounded-md bg-primary px-5 py-2.5 text-sm text-white transition duration-150 hover:bg-primaryHover"
                    onClick={handleCreateOrders}
                >
                    ŁADUJ ZAMÓWIENIE DO W-FIRMY!
                </button>
                <button
                    className="rounded-md bg-secondary px-5 py-2.5 text-sm text-white transition duration-150 hover:bg-secondaryLight"
                    onClick={handleSaveToDB}
                >
                    TYLKO ZAPISZ W BAZIE
                </button>
                <button
                    className="rounded-md bg-cta px-5 py-2.5 text-sm text-white transition duration-150 hover:bg-ctaHover"
                    onClick={handleCancel}
                >
                    PRZERWIJ / WYJDŹ
                </button>
            </div>
            <h2 className="mb-4 text-xl font-semibold">Szczegóły:</h2>
            <ProductTable data={uploadResult.data} />
        </>
    );
};
