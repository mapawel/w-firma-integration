import Navbar from '@/ui/components/organisms/Navbar';
import { FC } from 'react';

interface IProps {
    children: React.ReactNode;
}

const NavTemplate: FC<IProps> = ({ children }) => {
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </>
    );
};

export default NavTemplate;
