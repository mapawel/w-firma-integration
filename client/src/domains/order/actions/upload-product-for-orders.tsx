import axios from "axios";
import { cleanAppData, setAppData, startLoading, stopLoading } from "@/data-providers/app-status/use-app-status";
import { APIRoutes } from "@/navigation/routes/api.routes";
import { ProductActionResDTO } from "@/domains/order/dto/product-action-res-d-t.o";
import { NavigateFunction } from "react-router-dom";
import { ClientRoutes } from "@/navigation/routes/client.routes";

const redirect = (navigate: NavigateFunction, redirectRoute: ClientRoutes) => {
    cleanAppData();
    navigate(redirectRoute, { replace: true });
};

export const dispatchProductAction = async (
    route: APIRoutes,
    productIds: number[],
    navigate: NavigateFunction,
    redirectRoute: ClientRoutes
): Promise<ProductActionResDTO | void> => {
    const timer = startLoading();

    try {
        const { data: responseData }: { data: ProductActionResDTO } =
            await axios.post(route, productIds, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        stopLoading(timer);
        return responseData;
    } catch (err: any) {
        stopLoading(timer);

        if (err.response.status === 408)
            return setAppData({
                mainInfo: `Coś nie tak z połączeniem do W-Firma. Wskazówka: ${err.response.data.message}`,
                detailsArr: [],
                callbackClearInfo: () => redirect(navigate, redirectRoute),
                callbackClearInfoLabel: "Sprawdź w tabeli"
            });
        if (err.response.status === 400)
            return setAppData({
                mainInfo: "Coś nie tak z wysłanymi danymi. Wskazówki:",
                detailsArr: err.response.data.message,
                callbackClearInfo: () => redirect(navigate, redirectRoute),
                callbackClearInfoLabel: "Sprawdź w tabeli"
            });
        return setAppData({
            mainInfo: "Ups, coś poszło nie tak. Spróbuj ponownie.",
            detailsArr: [],
            callbackClearInfo: () => redirect(navigate, redirectRoute),
            callbackClearInfoLabel: "Sprawdź w tabeli"
        });
    }
};
