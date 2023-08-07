import { ClientRoutes } from "@/navigation/routes/client.routes";
import { ReactComponent as Settings } from "@/assets/icons/setting.svg";
import { ReactComponent as Data } from "@/assets/icons/data.svg";
import { ReactComponent as Upload } from "@/assets/icons/upload.svg";
import { CardData } from "@/ui/views/Home/types/card-data.type";

export const loaderCardData: CardData = {
    title: "Loader faktur i kodów",
    description:
        "Załaduj plik z fakturą zakupu *.csv. Tutaj także znajduje się loader słownika kodów dostawcy.",
    icon: <Upload className="w-20 fill-secondaryLight" />,
    path: ClientRoutes.UPLOAD
};

export const invoicesCardData: CardData = {
    title: "Przegląd faktur zakupu",
    description:
        "Przeglądaj załadowanie wcześniej pozycje z faktury zakupu. Sprawdź status poszczególnych pozycji.",
    icon: <Data className="w-20 fill-secondaryLight" />,
    path: ClientRoutes.INVOICES
};

export const settingsCardData: CardData = {
    title: "Konto i ustawienia",
    description:
        "Sprawdź ustawienia swojego konta oraz zmień możliwe opcje działania aplikacji.",
    icon: <Settings className="w-20 fill-secondaryLight" />,
    path: ClientRoutes.SETTINGS
};
