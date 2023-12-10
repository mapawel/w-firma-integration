import { BulkUploadResDTO } from "../../../../domains/invoice-upload/types/bulk-upload-res.dto";
import { BulkSaleUploadResDTO } from "@/domains/sale-upload/types/bulk-sale-upload-res.dto";

export const buildFeedbackModalDetails = (
    responseData: BulkUploadResDTO | BulkSaleUploadResDTO
): string[] => {
    const detailsArr: string[] = [];
    if ("invoicesCount" in responseData)
        detailsArr.push(`Procedowana liczba faktur: ${responseData.invoicesCount}`);
    detailsArr.push(
        `Sukces dla produktów: ${responseData.successCount} z ${
            responseData.successCount + responseData.problemCount
        }`
    );
    detailsArr.push(`Wykryte problemy: ${responseData.problemCount}`);
    detailsArr.push(
        `${
            responseData.canAutoProceed
                ? "Wrzucono dane do bazy pomyślnie, można procedować je bez przeszkód."
                : "Wymaga działania przed próbą wrzucenia zamówienia, sprawdź szczegóły w wykazie dodanych produktów z tych faktur/-y!"
        }`
    );
    return detailsArr;
};
