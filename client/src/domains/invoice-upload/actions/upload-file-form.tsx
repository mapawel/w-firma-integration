import axios from "axios";
import { setAppData, startLoading, stopLoading } from "@/data-providers/app-status/use-app-status";
import { Input } from "@/ui/views/Upload/Input.enum";
import { APIRoutes } from "@/navigation/routes/api.routes";
import { ClientRoutes } from "@/navigation/routes/client.routes";
import { NavigateFunction } from "react-router-dom";
import { UploadProductsResDTO } from "@/ui/views/Upload-result/Upload-prods-result.type";
import { UploadCodesResDTO } from "@/ui/views/Upload-result/Upload-codes-result.type";
import { UploadTypeEnum } from "@/ui/views/Upload/data/Upload-type.enum";
import { UploadSaleResDTO } from "@/ui/views/Upload-result/Upload-sale-result.type";
import { CustomersResDTO } from "@/domains/customers/dto/customers-res.dto";

export const upladFileForm = async (
    formRef: React.RefObject<HTMLFormElement>,
    navigate: NavigateFunction,
    customers?: CustomersResDTO[]
) => {
    const timer = startLoading();

    try {
        if (!formRef.current) {
            stopLoading(timer);
            return setAppData({
                mainInfo: "Ups, coś poszło nie tak. Spróbuj ponownie.",
                detailsArr: []
            });
        }

        const form: FormData = new FormData(formRef.current);

        const validateError: string | void = validateForm(form);
        if (validateError) {
            stopLoading(timer);
            return setAppData({
                mainInfo: validateError,
                detailsArr: []
            });
        }

        const {
            data
        }: {
            data: UploadProductsResDTO | UploadCodesResDTO | UploadSaleResDTO;
        } = await axios.post(APIRoutes.UPLOAD_FILE, form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        formRef.current?.reset();
        stopLoading(timer);

        const type = form.get(Input.TYPE);

        if (type === UploadTypeEnum.PRODUCTS)
            return navigate(ClientRoutes.UPLOAD_RESULT_PRODS, {
                state: {
                    uploadResult: data
                }
            });

        if (type === UploadTypeEnum.CODES)
            return navigate(ClientRoutes.UPLOAD_RESULT_CODES, {
                state: {
                    uploadResult: data
                }
            });

        if (type === UploadTypeEnum.SALE)
            return navigate(ClientRoutes.UPLOAD_RESULT_SALE, {
                state: {
                    uploadResult: data,
                    customers
                }
            });

        throw new Error("No proper upload type provided!");
    } catch (err: any) {
        formRef.current?.reset();
        stopLoading(timer);

        if (err.response.status === 400)
            return setAppData({
                mainInfo:
                    "Coś nie tak z plikiem lub ustawieniami jak plik ma być czytany. Wskazówki:",
                detailsArr: err.response.data.message
            });
        return setAppData({
            mainInfo: "Ups, coś poszło nie tak. Spróbuj ponownie.",
            detailsArr: []
        });
    }
};

const validateForm = (form: FormData): string | void => {
    if (!form.get(Input.TYPE)) return "Próba ładowania nieznanego typu danych.";
    if (
        !form.get(Input.FILE) ||
        !form.get(Input.SUPPLIER) ||
        !form.get(Input.CUR)
    )
        return "Nie wybrano wszystkich wymaganych opcji formularza.";
};
