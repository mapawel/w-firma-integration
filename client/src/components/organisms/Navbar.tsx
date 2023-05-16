import { FC } from 'react';
import useAuth from '@/providers/auth/use-auth';
import { IUser } from '@/providers/auth/interfaces';
import { APIRoutes } from '@/routes/api';

const Navbar: FC = (): JSX.Element => {
    const user: IUser | null = useAuth();
    return (
        <div>
            {user?.name ? (
                <>
                    <h2> {user.name}</h2>
                    <a href={APIRoutes.AUTH_LOGOUT}>Logout</a>
                </>
            ) : (
                <a href={APIRoutes.AUTH_LOGIN}>Login</a>
            )}
        </div>
    );
};

export default Navbar;
