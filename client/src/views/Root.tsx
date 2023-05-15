// import { ProvideAuth } from '@/providers/auth/use-auth';
import ProvideAppStatus from '@/providers/app-status/Provide-app-status';
import { AuthProvider } from '@/providers/auth/use-auth';
import Navbar from '@/components/organisms/Navbar';

function Root(): JSX.Element {
    return (
        <AuthProvider>
            <ProvideAppStatus>
                <Navbar />
                <h1>React 18 Alpha</h1>
            </ProvideAppStatus>
        </AuthProvider>
    );
}

export default Root;
