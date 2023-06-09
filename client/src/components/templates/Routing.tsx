import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useAuth from '@/providers/auth/use-auth';
import { IUser } from '@/providers/auth/interfaces';
import { navigationData } from '@/navigation/data';
import { NavigationDataItem } from '@/navigation/navigation-item.type';
import Navbar from '../organisms/Navbar';

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
