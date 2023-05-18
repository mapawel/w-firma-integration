import { CardData } from '@/assets/cards/card-data.type';
import { ClientRoutes } from '@/routes/client';

export type NavigationDataItem = {
    cardData: CardData | null;
    path: ClientRoutes;
    restrictedForLogged: boolean;
    restrictedForRoles: string[] | null;
    element: any;
};
