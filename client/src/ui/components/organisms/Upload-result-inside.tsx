import { FC } from 'react';
import { toFixedNum } from '@/global-helpers/to-fixed-num';
import { UploadProductsResDTO } from '@/ui/views/Upload-result/Upload-prods-result.type';
import ProductTable from './Product-table';
import { UploadTypeEnum } from '@/ui/views/Upload/data/Upload-type.enum';
import { UploadSaleResDTO } from '@/ui/views/Upload-result/Upload-sale-result.type';
import { CustomersResDTO } from '@/domains/customers/dto/customers-res.dto';

interface IProps {
    uploadResult: UploadProductsResDTO | UploadSaleResDTO;
    handleCreateOrders: () => void;
    handleSaveToDB: () => void;
    handleCancel: () => void;
    viewType: UploadTypeEnum;
    customers?: CustomersResDTO[];
}

export const UploadResultInside: FC<IProps> = ({
    uploadResult,
    handleCreateOrders,
    handleSaveToDB,
    handleCancel,
    viewType,
    customers,
}) => {
    const {
        data = [],
        totalPositions = 0,
        totalQty = 0,
        totalValue = 0,
    } = uploadResult;

    const getCustomerNameById = (
        customerId: string,
        customers: CustomersResDTO[] | undefined,
    ) => {
        if (!customers || !customers.length) return '';
        return customers.find(
            (customer: CustomersResDTO) => customer.id === customerId,
        )?.name;
    };

    return (
        <>
            <h1 className="mb-4 text-2xl font-semibold">
                Odczytano z załadowanego pliku:
            </h1>
            <div className="mb-8 flex gap-10">
                <div>
                    <h3 className="text-xl">
                        {viewType === UploadTypeEnum.SALE
                            ? 'Klient:'
                            : 'Dostawca:'}
                    </h3>
                    <h3 className="text-xl">Ilość pozycji:</h3>
                    <h3 className="text-xl">Ilość szt:</h3>
                    <h3 className="text-xl">Wartość:</h3>
                </div>
                <div>
                    <p className="text-right text-xl font-semibold">
                        {viewType === UploadTypeEnum.SALE
                            ? getCustomerNameById(
                                  data?.[0]?.customerId,
                                  customers,
                              )
                            : data?.[0]?.supplier?.toUpperCase()}
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
                    {viewType === UploadTypeEnum.SALE
                        ? 'ŁADUJ REZERWACJĘ DO W-FIRMY!'
                        : 'ŁADUJ ZAMÓWIENIE DO W-FIRMY!'}
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
            <ProductTable data={uploadResult.data} viewType={viewType} />
        </>
    );
};
