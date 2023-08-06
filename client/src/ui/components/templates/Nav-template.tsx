import Navbar from '@/ui/components/organisms/Navbar';
import { FC } from 'react';
import {
    Location,
    NavigateFunction,
    useLocation,
    useNavigate,
} from 'react-router-dom';

interface IProps {
    children: React.ReactNode;
}

const NavTemplate: FC<IProps> = ({ children }) => {
    const location: Location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    {location?.pathname !== '/' && (
                        <button
                            className="mb-9 rounded-md bg-secondaryLight px-5 py-2.5 text-sm text-white transition duration-150 hover:bg-secondary"
                            onClick={() => navigate(-1)}
                        >
                            BACK
                        </button>
                    )}
                    {children}
                </div>
            </main>
        </>
    );
};

export default NavTemplate;
