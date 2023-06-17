import { CardData } from '@/ui/views/Home/types/card-data.type';
import { ClientRoutes } from '@/navigation/routes/client.routes';

export type NavigationDataItem = {
    cardData: CardData | null;
    path: ClientRoutes;
    restrictedForLogged: boolean;
    restrictedForRoles: string[] | null;
    element: any;
};
