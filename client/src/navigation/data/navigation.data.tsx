import { ClientRoutes } from "@/navigation/routes/client.routes";
import HomeView from "@/ui/views/Home/Home";
import UploadView from "@/ui/views/Upload/Upload";
import UploadSaleView from "@/ui/views/Upload-sale/Upload-sale";
import ResultView from "@/ui/views/Upload-result/Result";
import InvoicesView from "@/ui/views/Invoices/Invoices";
import SettingsView from "@/ui/views/Settings/Settings";
import ResultViewCodes from "@/ui/views/Upload-result/Result-codes";
import { NavigationDataItem } from "../types/navigation-item.type";
import {
    invoicesCardData,
    loaderCardData,
    loaderSaleCardData,
    saleCardData,
    settingsCardData
} from "@/navigation/data/navigation-cards.data";
import ResultSaleView from "@/ui/views/Upload-result/Result-sale";
import Sale from "@/ui/views/Sale/Sale";

export const navigationData: NavigationDataItem[] = [
    {
        cardData: null,
        path: ClientRoutes.HOME,
        restrictedForLogged: true,
        restrictedForRoles: null,
        element: <HomeView />
    },
    {
        cardData: loaderCardData,
        path: ClientRoutes.UPLOAD,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <UploadView />,
        title: "Ładowanie zleceń zakupu do W-Firmy"
    },
    {
        cardData: invoicesCardData,
        path: ClientRoutes.INVOICES,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <InvoicesView />,
        title: "Przegląd zleceń zakupu w bazie i W-Firmie"
    },
    {
        cardData: loaderSaleCardData,
        path: ClientRoutes.UPLOAD_SALE,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <UploadSaleView />,
        title: "Ładowanie rezerwacji do W-Firmy"
    },
    {
        cardData: saleCardData,
        path: ClientRoutes.SALE,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <Sale />,
        title: "Przegląd rezerwacji w bazie i W-Firmie"
    },
    {
        cardData: settingsCardData,
        path: ClientRoutes.SETTINGS,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <SettingsView />,
        title: "Ustawienia systemu CRM"
    },
    {
        cardData: null,
        path: ClientRoutes.UPLOAD_RESULT_PRODS,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <ResultView />,
        title: "Podsumowanie ładowania zleceń zakupu do W-Firmy"
    },
    {
        cardData: null,
        path: ClientRoutes.UPLOAD_RESULT_CODES,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <ResultViewCodes />,
        title: "Podsumowanie ładowania tłumaczeń kodów dostawcy W-Firmy"
    },
    {
        cardData: null,
        path: ClientRoutes.UPLOAD_RESULT_SALE,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <ResultSaleView />,
        title: "Podsumowanie ładowania rezerwacji do W-Firmy"
    }
];
