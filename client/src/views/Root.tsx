import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppStatusProvider from '@/providers/app-status/App-status.provider';
import AuthProvider from '@/providers/auth/Auth.provider';
import HomeView from '@/views/Home';
import LoadView from '@/views/Load';
import InvoicesView from '@/views/Invoices';
import SettingsView from '@/views/Settings';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeView />,
    },
    {
        path: '/load',
        element: <LoadView />,
    },
    {
        path: '/invoices',
        element: <InvoicesView />,
    },
    {
        path: '/settings',
        element: <SettingsView />,
    },
]);

function Root(): JSX.Element {
    return (
        <AppStatusProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </AppStatusProvider>
    );
}

export default Root;
