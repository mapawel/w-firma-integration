import useAuth, { IUser } from '@/providers/auth/use-auth';
import { FC } from 'react';

const Navbar: FC = (): JSX.Element => {
    const user: IUser | null = useAuth();
    return (
        <div>
            {user?.name ? (
                <>
                    <h2> {user.name}</h2>
                    <a href="/api/auth/logout">Logout</a>
                </>
            ) : (
                <a href="/api/auth">Login</a>
            )}
        </div>
    );
};

export default Navbar;
