import { FC, useCallback } from "react";
import { useCheckboxes } from "@/data-providers/check-boxes-provider/use-check-boxes";
import { deleteProducts } from "@/domains/products/actions/delete-products";
import { useNavigate } from "react-router-dom";
import { upladProductsForOrders } from "@/domains/order/actions/upload-product-for-orders";
import { CreateOrderResDTO } from "@/domains/order/dto/create-order-res.dto";
import { refreshCodeIds } from "@/domains/invoice-upload/actions/refresh-code-ids";
import { cleanAppData, setAppData } from "@/data-providers/app-status/use-app-status";
import { ClientRoutes } from "@/navigation/routes/client.routes";
import { DeleteProductsResDTO } from "@/domains/products/dto/delete-products-res.dto";
import { APIRoutes } from "@/navigation/routes/api.routes";

interface IdropdownApiRoutes {
    handleProductsAction: APIRoutes,
    handleProductsDelete: APIRoutes
}

interface IProps {
    isDropdownOpen: boolean;
    dropdownRoutes: IdropdownApiRoutes;
    useData: () => any;
}

export const TableDropdown: FC<IProps> = ({ isDropdownOpen, dropdownRoutes, useData }) => {
    const { checked, setChecked } = useCheckboxes();
    const navigate = useNavigate();
    const { mutate } = useData();

    const handleCreateOrder = useCallback(async () => {
        await refreshCodeIds();
        const createOrdersInfo: CreateOrderResDTO | void =
            await upladProductsForOrders(checked, navigate);
        if (!createOrdersInfo) return;
        setAppData({
            mainInfo: "Informacja o statusie dodawania zamówień do W-Firma:",
            detailsArr: createOrdersInfo.info,
            callbackClearInfo: () => {
                cleanAppData();
                navigate(ClientRoutes.INVOICES, { replace: true });
            },
            callbackClearInfoLabel: "OK"
        });
        setChecked([]);
        mutate();
    }, [checked, mutate, navigate, setChecked]);

    const handleDelete = useCallback(async () => {
        const deleteProductsInfo: DeleteProductsResDTO | void =
            await deleteProducts(dropdownRoutes.handleProductsDelete, checked);

        if (!deleteProductsInfo) return;
        setAppData({
            mainInfo: deleteProductsInfo.info,
            detailsArr: []
        });

        setChecked([]);
        mutate();
    }, [checked, mutate, setChecked]);

    return (
        <div
            id="actionsDropdown"
            className={`absolute right-0 top-full z-10 mt-2 w-72 divide-y rounded bg-white shadow dark:bg-black ${
                !isDropdownOpen && "hidden"
            }`}
        >
            {checked.length > 0 ? (
                <ul
                    className="rounded-lg border border-secondaryLight py-1 text-sm text-gray-700 dark:border-secondary dark:text-gray-200"
                    aria-labelledby="actionsDropdownButton"
                >
                    <li>
                        <button
                            onClick={handleCreateOrder}
                            className="w-full border-none bg-transparent px-4 py-2 uppercase hover:bg-secondaryLight hover:text-white dark:hover:bg-secondary"
                        >
                            Stwórz zamówienie
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleDelete}
                            className="w-full border-none bg-transparent px-4 py-2 uppercase hover:bg-secondaryLight hover:text-white dark:hover:bg-secondary"
                        >
                            Usuń zaznaczone
                        </button>
                    </li>
                </ul>
            ) : (
                <div className="m-6">
                    <span className="block text-center italic text-secondaryLight">
                        zaznacz produkty
                    </span>
                </div>
            )}
        </div>
    );
};
