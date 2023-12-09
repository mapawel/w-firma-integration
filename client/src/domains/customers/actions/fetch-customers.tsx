import axios from "axios";
import { setAppData, startLoading, stopLoading } from "@/data-providers/app-status/use-app-status";
import { ResponseFromCustomersFetchDto } from "../dto/response-from-customers-fetch.dto";
import { APIRoutes } from "@/navigation/routes/api.routes";

export const fetchCustomers = async (): Promise<ResponseFromCustomersFetchDto | void> => {
    const timer = startLoading();

    try {
        const { data }: { data: ResponseFromCustomersFetchDto } = await axios.get(
            APIRoutes.FETCH_CUSTOMERS,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        stopLoading(timer);

        return data;
    } catch (err: any) {
        stopLoading(timer);

        if (err.response.status === 403)
            setAppData({
                mainInfo: "Nie masz dpstępu do tych danych lub tej czynności!",
                detailsArr: []
            });

        if (err.response.status === 400)
            setAppData({
                mainInfo: "Coś nie tak z wysłanymi danymi. Wskazówki:",
                detailsArr: err.response.data.message
            });
        setAppData({
            mainInfo: "Ups, coś poszło nie tak. Spróbuj ponownie.",
            detailsArr: []
        });
    }
};
