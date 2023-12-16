import { FC, useCallback } from "react";
import { useCheckboxes } from "@/data-providers/check-boxes-provider/use-check-boxes";
import { deleteProducts } from "@/domains/products/actions/delete-products";
import { useNavigate } from "react-router-dom";
import { ProductActionResDTO } from "@/domains/order/dto/product-action-res-d-t.o";
import { cleanAppData, setAppData } from "@/data-providers/app-status/use-app-status";
import { ClientRoutes } from "@/navigation/routes/client.routes";
import { DeleteProductsResDTO } from "@/domains/products/dto/delete-products-res.dto";
import { APIRoutes } from "@/navigation/routes/api.routes";
import { dispatchProductAction } from "@/domains/order/actions/upload-product-for-orders";

interface IdropdownApiRoutes {
    handleProductsAction: APIRoutes;
    handleProductsDelete: APIRoutes;
    redirectAfterAction: ClientRoutes;
}

interface IdropdownLabels {
    resultInformation: string;
    actionCreate: string;
    actionDelete: string;
}

interface IProps {
    isDropdownOpen: boolean;
    dropdownRoutes: IdropdownApiRoutes;
    dropdownLabels: IdropdownLabels;
    useData: () => any;
}

export const TableDropdown: FC<IProps> = ({
                                              isDropdownOpen,
                                              dropdownRoutes,
                                              dropdownLabels,
                                              useData
                                          }) => {
    const { checked, setChecked, turnOffAllChecked } = useCheckboxes();
    const navigate = useNavigate();
    const { mutate } = useData();

    const handleProductAction = useCallback(async () => {
        const actionResultInfo: ProductActionResDTO | void =
            await dispatchProductAction(
                dropdownRoutes.handleProductsAction,
                checked,
                navigate,
                dropdownRoutes.redirectAfterAction
            );
        if (!actionResultInfo) return;
        setAppData({
            mainInfo: dropdownLabels.resultInformation,
            detailsArr: actionResultInfo.info,
            callbackClearInfo: () => {
                cleanAppData();
                navigate(dropdownRoutes.redirectAfterAction, { replace: true });
            },
            callbackClearInfoLabel: "OK"
        });
        turnOffAllChecked();
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

        turnOffAllChecked();
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
                            onClick={handleProductAction}
                            className="w-full border-none bg-transparent px-4 py-2 uppercase hover:bg-secondaryLight hover:text-white dark:hover:bg-secondary"
                        >
                            {dropdownLabels.actionCreate}
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleDelete}
                            className="w-full border-none bg-transparent px-4 py-2 uppercase hover:bg-secondaryLight hover:text-white dark:hover:bg-secondary"
                        >
                            {dropdownLabels.actionDelete}
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
