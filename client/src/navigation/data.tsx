import React, { FC } from 'react';
import { ClientRoutes } from '@/routes/client';
import { ReactComponent as Settings } from '@/assets/icons/setting.svg';
import { ReactComponent as Data } from '@/assets/icons/data.svg';
import { ReactComponent as Upload } from '@/assets/icons/upload.svg';
import HomeView from '@/views/Home';
import LoadView from '@/views/Load';
import InvoicesView from '@/views/Invoices';
import SettingsView from '@/views/Settings';

export type CardData = {
    title: string;
    description: string;
    icon: any;
    path: ClientRoutes;
};

export type NavigationDataItem = {
    cardData: CardData | null;
    path: ClientRoutes;
    restrictedForLogged: boolean;
    restrictedForRoles: string[] | null;
    element: any;
};

export const navigationData: NavigationDataItem[] = [
    {
        cardData: null,
        path: ClientRoutes.HOME,
        restrictedForLogged: true,
        restrictedForRoles: null,
        element: <HomeView />,
    },
    {
        cardData: {
            title: 'Loader faktur zakupu',
            description:
                'Załaduj plik z fakturą zakupu w celu dodania towaru do systemu. Opcja powoduje wprowadzenie towaru na magazyn.',
            icon: <Upload className="w-20 fill-secondaryLight" />,
            path: ClientRoutes.LOAD,
        },
        path: ClientRoutes.LOAD,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <LoadView />,
    },
    {
        cardData: {
            title: 'Przegląd faktur zakupu',
            description:
                'Przeglądaj załadowanie wcześniej faktury zakupu. Sprawdź status poszczególnych pozycji.',
            icon: <Data className="w-20 fill-secondaryLight" />,
            path: ClientRoutes.INVOICES,
        },
        path: ClientRoutes.INVOICES,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <InvoicesView />,
    },
    {
        cardData: {
            title: 'Ustawienia i uprawnienia',
            description:
                'Sprawdź ustawienia swojego konta oraz zmień moćliwe opcje działania aplikacji.',
            icon: <Settings className="w-20 fill-secondaryLight" />,
            path: ClientRoutes.SETTINGS,
        },
        path: ClientRoutes.SETTINGS,
        restrictedForLogged: false,
        restrictedForRoles: null,
        element: <SettingsView />,
    },
];
