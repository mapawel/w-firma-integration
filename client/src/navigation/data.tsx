import { ClientRoutes } from '@/routes/client';
import HomeView from '@/views/Home';
import UploadView from '@/views/Upload/Upload';
import ResultView from '@/views/Upload/Result/Result';
import InvoicesView from '@/views/Invoices';
import SettingsView from '@/views/Settings';
import { NavigationDataItem } from './navigation-item.type';
import {
    loaderCardData,
    invoicesCardData,
    settingsCardData,
} from '@/assets/cards';

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
        cardData: settingsCardData,
        path: ClientRoutes.SETTINGS,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <SettingsView />,
    },
    {
        cardData: null,
        path: ClientRoutes.UPLOAD_RESULT,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <ResultView />,
    },
];
