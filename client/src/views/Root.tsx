import AppStatusProvider from '@/providers/app-status/App-status.provider';
import AuthProvider from '@/providers/auth/Auth.provider';
import { navigationData, NavigationDataItem } from '@/navigation/data';
import Routing from '@/components/templates/Routing';

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
