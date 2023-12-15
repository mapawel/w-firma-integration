import { ClientRoutes } from "@/navigation/routes/client.routes";
import { ReactComponent as Settings } from "@/assets/icons/setting.svg";
import { ReactComponent as Data } from "@/assets/icons/data.svg";
import { ReactComponent as Sale } from "@/assets/icons/dollar.svg";
import { ReactComponent as Upload } from "@/assets/icons/upload.svg";
import { ReactComponent as Chart } from "@/assets/icons/chart.svg";
import { CardData } from "@/ui/views/Home/types/card-data.type";

export const loaderCardData: CardData = {
    title: "Loader faktur i KODÓW",
    description:
        "Załaduj plik z fakturą zakupu *.csv. Tutaj także znajduje się loader słownika kodów dostawcy.",
    icon: <Upload className="h-24 w-20 fill-secondaryLight" />,
    path: ClientRoutes.UPLOAD
};

export const invoicesCardData: CardData = {
    title: "Przegląd faktur zakupu",
    description:
        "Przeglądaj załadowanie wcześniej pozycje z faktury zakupu. Sprawdź status poszczególnych pozycji.",
    icon: <Data className="h-24 w-20 fill-secondaryLight" />,
    path: ClientRoutes.INVOICES
};

export const loaderSaleCardData: CardData = {
    title: "Kreator rezerwacji",
    description: "Twórz zbiorczo rezerwacje w W-Firma na bazie pliku loadera i generuj faktury sprzedaży.",
    icon: <Chart className="h-24 w-20 fill-secondaryLight" />,
    path: ClientRoutes.UPLOAD_SALE
};

export const saleCardData: CardData = {
    title: "Przegląd załadowanych rezerwacji",
    description:
        "Przeglądaj wcześniej załadowane rezerwacje. Sprawdź status pozycji.",
    icon: <Sale className="h-24 w-20 fill-secondaryLight" />,
    path: ClientRoutes.SALE
};

export const settingsCardData: CardData = {
    title: "Konto i ustawienia",
    description:
        "Sprawdź ustawienia swojego konta oraz zmień możliwe opcje działania aplikacji.",
    icon: <Settings className="h-24 w-20 fill-secondaryLight" />,
    path: ClientRoutes.SETTINGS
};
