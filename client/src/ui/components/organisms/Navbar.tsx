import { FC } from 'react';
import useAuth from '@/data-providers/auth/use-auth';
import { IUser } from '@/data-providers/auth/interfaces/user.interface';
import { APIRoutes } from '@/navigation/routes/api.routes';
import { ReactComponent as Logo } from '@/assets/logo/logo.svg';

const Navbar: FC = (): JSX.Element => {
    const user: IUser | null = useAuth();
    return (
        <div className="mx-auto mb-10 max-w-screen-xl px-4 sm:px-6 lg:mb-20">
            <div className="flex h-20 items-center justify-between">
                <a className="mb-2 block" href="/">
                    <Logo />
                </a>
                <div className="ml-6 mr-auto hidden md:block">
                    <h1 className="mr-auto text-xl font-[600] text-secondaryLight">
                        W-Firma Integratition App
                    </h1>
                </div>
                <div className="ml-auto mr-8 hidden sm:block">
                    <p className="font-[600] text-secondary">{user?.name}</p>
                </div>

                <a
                    className="rounded-md bg-cta px-5 py-2.5 text-sm text-white transition duration-150 hover:bg-ctaHover"
                    href={
                        user?.name
                            ? APIRoutes.AUTH_LOGOUT
                            : APIRoutes.AUTH_LOGIN
                    }
                >
                    {user?.name ? 'Logout' : 'Login'}
                </a>
            </div>
        </div>
    );
};

export default Navbar;
