import { useAuth, IAuth } from '@/providers/auth/use-auth';
import Button from '@/components/atoms/Button';
import { FC } from 'react';

const Navbar: FC = (): JSX.Element => {
    const { user, signout }: IAuth = useAuth();
    return (
        <div>{user && <Button onClick={() => signout()}>Signout</Button>}</div>
    );
};

export default Navbar;
