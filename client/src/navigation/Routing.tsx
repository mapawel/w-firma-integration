import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useAuth from '@/data-providers/auth/use-auth';
import { IUser } from '@/data-providers/auth/interfaces/user.interface';
import { navigationData } from './data/navigation.data';
import { NavigationDataItem } from '@/navigation/types/navigation-item.type';
import Navbar from '../ui/components/organisms/Navbar';

const router = createBrowserRouter(
    navigationData.map(({ path, element }: NavigationDataItem) => ({
        path,
        element,
    })),
);

const Routing: FC = () => {
    const user: IUser | null = useAuth();

    return <>{user?.name ? <RouterProvider router={router} /> : <Navbar />}</>;
};

export default Routing;
