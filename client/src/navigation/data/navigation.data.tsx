import { ClientRoutes } from '@/navigation/routes/client.routes';
import HomeView from '@/ui/views/Home/Home';
import UploadView from '@/ui/views/Upload/Upload';
import UploadSaleView from '@/ui/views/Upload-sale/Upload-sale';
import ResultView from '@/ui/views/Upload-result/Result';
import InvoicesView from '@/ui/views/Invoices/Invoices';
import SettingsView from '@/ui/views/Settings/Settings';
import ResultViewCodes from '@/ui/views/Upload-result/Result-codes';
import { NavigationDataItem } from '../types/navigation-item.type';
import {
    invoicesCardData,
    loaderCardData,
    loaderSaleCardData,
    saleCardData,
    settingsCardData,
} from '@/navigation/data/navigation-cards.data';
import ResultSaleView from '@/ui/views/Upload-result/Result-sale';

export const navigationData: NavigationDataItem[] = [
    {
        cardData: null,
        path: ClientRoutes.HOME,
        restrictedForLogged: true,
        restrictedForRoles: null,
        element: <HomeView />,
    },
    {
        cardData: loaderCardData,
        path: ClientRoutes.UPLOAD,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <UploadView />,
    },
    {
        cardData: invoicesCardData,
        path: ClientRoutes.INVOICES,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <InvoicesView />,
    },
    {
        cardData: loaderSaleCardData,
        path: ClientRoutes.UPLOAD_SALE,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <UploadSaleView />,
    },
    {
        cardData: saleCardData,
        path: ClientRoutes.SALE,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <InvoicesView />,
    },
    {
        cardData: settingsCardData,
        path: ClientRoutes.SETTINGS,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <SettingsView />,
    },
    {
        cardData: null,
        path: ClientRoutes.UPLOAD_RESULT_PRODS,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <ResultView />,
    },
    {
        cardData: null,
        path: ClientRoutes.UPLOAD_RESULT_CODES,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <ResultViewCodes />,
    },
    {
        cardData: null,
        path: ClientRoutes.UPLOAD_RESULT_SALE,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <ResultSaleView />,
    },
];
