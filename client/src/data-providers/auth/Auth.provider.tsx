import { FC, useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import {
    setAppData,
    startLoading,
    stopLoading,
} from '@/data-providers/app-status/use-app-status';
import { IUser } from './interfaces/user.interface';
import { authContext } from './auth.context';
import { APIRoutes } from '@/navigation/routes/api.routes';

// FOR DEVELOPMENT !!!
// const mockUser: IUser = {
//     name: 'JohnDoeLongEmail@google.com',
//     roles: ['admin'],
// };

interface IProps {
    children: React.ReactNode;
}
const AuthProvider: FC<IProps> = ({ children }) => {
    //TODO FOR DEVELOPMENT
    const [user, setUser] = useState<IUser | null>(null);

    const fetchUser = useCallback(async (): Promise<IUser | null> => {
        const timer = startLoading();
        try {
            const { data }: { data: IUser } = await axios.get(
                APIRoutes.AUTH_GET_USER,
            );

            stopLoading(timer);
            return data;
        } catch {
            stopLoading(timer);

            //TODO FOR DEVELOPMENT

            setAppData({
                mainInfo: "Couldn't fetch user!",
                detailsArr: [],
            });
            return null;
        }
    }, []);

    useEffect(() => {
        const initFetch = async () => {
            const fetchedUser: IUser | null = await fetchUser();
            setUser(fetchedUser);
        };
        if (!user?.name) initFetch();
    }, [fetchUser, user?.name]);

    return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default AuthProvider;
