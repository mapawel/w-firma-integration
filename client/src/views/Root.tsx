import Button from '@/components/atoms/Button';
import { ProvideAuth } from '@/providers/auth/use-auth';
import { ProvideLoading } from '@/providers/loading/use-loading';
import Navbar from '@/components/organisms/Navbar';

function Root(): JSX.Element {
    return (
        <ProvideAuth>
            <ProvideLoading>
                <Navbar />
                <h1>React 18 Alpha</h1>
                <Button onClick={() => alert('clicked')}>Click me</Button>
            </ProvideLoading>
        </ProvideAuth>
    );
}

export default Root;
