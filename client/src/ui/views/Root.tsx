import AppStatusProvider from '@/data-providers/app-status/App-status.provider';
import AuthProvider from '@/data-providers/auth/Auth.provider';
import Routing from '@/navigation/Routing';

function Root(): JSX.Element {
    return (
        <AppStatusProvider>
            <AuthProvider>
                <Routing />
            </AuthProvider>
        </AppStatusProvider>
    );
}

export default Root;
