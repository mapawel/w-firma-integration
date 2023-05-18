import { ClientRoutes } from '@/routes/client';
import HomeView from '@/views/Home';
import LoadView from '@/views/Load/Load';
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
        path: ClientRoutes.LOAD,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <LoadView />,
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
];
