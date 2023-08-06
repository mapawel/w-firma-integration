import { FC } from 'react';
import NavTemplate from '@/ui/components/templates/Nav-template';
import useAuth from '@/data-providers/auth/use-auth';
import { IUser } from '@/data-providers/auth/interfaces/user.interface';

const SettingsView: FC = () => {
    const user: IUser | null = useAuth();
    return (
        <NavTemplate>
            <div className="rounded-xl border border-gray-100 p-4 shadow-md sm:p-6 lg:p-8">
                <h1 className="text-3xl font-semibold">
                    Dane bieżącego konta:
                </h1>
                <div className="my-5">
                    <h2 className="text-xl font-semibold text-secondary">
                        Nazwa użytkownika:
                    </h2>
                    <p className="ml-3 font-bold text-primary">{user?.name}</p>
                </div>
                <div className="my-5">
                    <h2 className="text-xl font-semibold text-secondary">
                        Rola użytkownika:
                    </h2>
                    <p className="ml-3 font-bold text-primary">{user?.roles}</p>
                </div>
            </div>
        </NavTemplate>
    );
};

export default SettingsView;
