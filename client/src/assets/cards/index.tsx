import { ClientRoutes } from '@/routes/client';
import { ReactComponent as Settings } from '@/assets/icons/setting.svg';
import { ReactComponent as Data } from '@/assets/icons/data.svg';
import { ReactComponent as Upload } from '@/assets/icons/upload.svg';
import { CardData } from '@/assets/cards/card-data.type';

export const loaderCardData: CardData = {
    title: 'Loader faktur zakupu',
    description:
        'Załaduj plik z fakturą zakupu w celu dodania towaru do systemu. Opcja powoduje wprowadzenie towaru na magazyn.',
    icon: <Upload className="w-20 fill-secondaryLight" />,
    path: ClientRoutes.UPLOAD,
};

export const invoicesCardData: CardData = {
    title: 'Przegląd faktur zakupu',
    description:
        'Przeglądaj załadowanie wcześniej faktury zakupu. Sprawdź status poszczególnych pozycji.',
    icon: <Data className="w-20 fill-secondaryLight" />,
    path: ClientRoutes.INVOICES,
};

export const settingsCardData: CardData = {
    title: 'Ustawienia i uprawnienia',
    description:
        'Sprawdź ustawienia swojego konta oraz zmień moćliwe opcje działania aplikacji.',
    icon: <Settings className="w-20 fill-secondaryLight" />,
    path: ClientRoutes.SETTINGS,
};
