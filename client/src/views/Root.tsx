// import { ProvideAuth } from '@/providers/auth/use-auth';
import { ProvideAppStatus } from '@/providers/app-status/use-app-status';
import Navbar from '@/components/organisms/Navbar';
import { useFetchUser } from '@/providers/auth/use-auth';

function Root(): JSX.Element {
    useFetchUser()
    return (
        <ProvideAppStatus>
            <Navbar />
            <h1>React 18 Alpha</h1>
        </ProvideAppStatus>
    );
}

export default Root;
