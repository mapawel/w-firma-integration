import AppStatusProvider from '@/providers/app-status/App-status.provider';
import AuthProvider from '@/providers/auth/Auth.provider';
import Navbar from '@/components/organisms/Navbar';

function Root(): JSX.Element {
    return (
        <AppStatusProvider>
            <AuthProvider>
                <Navbar />
                <h1>React 18 Alpha</h1>
                <h1 className="text-4xl font-bold">Hello world!</h1>
            </AuthProvider>
        </AppStatusProvider>
    );
}

export default Root;
