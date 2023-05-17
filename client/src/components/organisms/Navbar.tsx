import { FC } from 'react';
import useAuth from '@/providers/auth/use-auth';
import { IUser } from '@/providers/auth/interfaces';
import { APIRoutes } from '@/routes/api';
import { Logo } from '@/assets/logo/logoBig';

const Navbar: FC = (): JSX.Element => {
    const user: IUser | null = useAuth();
    return (
        <div className="mx-auto mb-10 max-w-screen-xl px-4 sm:px-6 lg:mb-1 lg:mb-20">
            <div className="flex h-16 items-center justify-between">
                <div className="md:flex md:items-center md:gap-12">
                    <a className="block text-teal-600" href="/">
                        <Logo />
                    </a>
                </div>
                <div className="ml-8 mr-auto mt-2 hidden sm:block">
                    <h1 className="mr-auto text-xl font-[600] text-secondaryLight">
                        W-Firma Integratition App
                    </h1>
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
