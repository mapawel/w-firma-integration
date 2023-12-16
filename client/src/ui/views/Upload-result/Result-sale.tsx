import NavTemplate from "@/ui/components/templates/Nav-template";
import { ClientRoutes } from "@/navigation/routes/client.routes";
import { FC } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { cleanAppData, setAppData } from "@/data-providers/app-status/use-app-status";
import { UploadResultInside } from "@/ui/components/organisms/Upload-result-inside";
import { buildFeedbackModalDetails } from "./helpers/build-feedback-modal-details";
import { UploadTypeEnum } from "@/ui/views/Upload/data/Upload-type.enum";
import { BulkSaleUploadResDTO } from "@/domains/sale-and-sale-upload/types/bulk-sale-upload-res.dto";
import { uploadSaleProductToDB } from "@/domains/sale-and-sale-upload/actions/upload-sale-products-to-db";
import { UploadSaleResDTO } from "@/ui/views/Upload-result/Upload-sale-result.type";
import { CustomersResDTO } from "@/domains/customers/dto/customers-res.dto";
import { ProductActionResDTO } from "@/domains/order/dto/product-action-res-d-t.o";
import { dispatchProductAction } from "@/domains/order/actions/upload-product-for-orders";
import { APIRoutes } from "@/navigation/routes/api.routes";

const ResultSaleView: FC = () => {
    const navigate = useNavigate();
    const {
        state
    }: {
        state: { uploadResult: UploadSaleResDTO; customers: CustomersResDTO[] };
    } = useLocation();
    const {
        uploadResult: {
            data = [],
            totalPositions = 0,
            totalQty = 0,
            totalValue = 0
        } = {},
        customers
    } = state || {};

    const handleSaveToDB = async (): Promise<void> => {
        const responseData: BulkSaleUploadResDTO | void =
            await uploadSaleProductToDB({
                data,
                totalPositions,
                totalQty,
                totalValue
            });
        if (!responseData) return;

        setAppData({
            mainInfo:
                "Pomyślnie dodano produkty pod rezerwację do bazy danych.",
            detailsArr: buildFeedbackModalDetails(responseData),
            callbackClearInfo: () => {
                cleanAppData();
                navigate(ClientRoutes.SALE, { replace: true });
            },
            callbackClearInfoLabel: "Sprawdź w tabeli rezerwacji"
        });
    };

    const handleCreateReservation = async (): Promise<void> => {
        const responseData: BulkSaleUploadResDTO | void = await uploadSaleProductToDB({
            data,
            totalPositions,
            totalQty,
            totalValue
        });
        if (!responseData) return;

        const createOrdersInfo: ProductActionResDTO | void =
            await dispatchProductAction(APIRoutes.UPLOAD_FETCH_DELETE_SALEPRODUCTS, responseData.productIds, navigate, ClientRoutes.SALE);
        if (!createOrdersInfo) return;

        setAppData({
            mainInfo: "Informacja o statusie dodawania rezerwacji do W-Firma:",
            detailsArr: createOrdersInfo.info,
            callbackClearInfo: () => {
                cleanAppData();
                navigate("/", { replace: true });
            },
            callbackClearInfoLabel: "Wróć do strony głównej"
        });
    };

    const handleCancel = (): void =>
        navigate(ClientRoutes.UPLOAD_SALE, { replace: true });

    return (
        <>
            {!state && <Navigate to="/upload" replace={true} />}

            <NavTemplate>
                <UploadResultInside
                    uploadResult={state.uploadResult}
                    handleCancel={handleCancel}
                    handleCreateOrders={handleCreateReservation}
                    handleSaveToDB={handleSaveToDB}
                    viewType={UploadTypeEnum.SALE}
                    customers={customers}
                />
            </NavTemplate>
        </>
    );
};

export default ResultSaleView;
