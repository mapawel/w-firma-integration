import AppStatusProvider from '@/providers/app-status/App-status.provider';
import AuthProvider from '@/providers/auth/Auth.provider';
import Home from '@/views/Home';

function Root(): JSX.Element {
    return (
        <AppStatusProvider>
            <AuthProvider>
                <Home />
            </AuthProvider>
        </AppStatusProvider>
    );
}

export default Root;
