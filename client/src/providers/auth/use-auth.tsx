import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
    FC,
} from 'react';
import {
    startLoading,
    stopLoading,
    setAppError,
} from '@/providers/app-status/use-app-status';
import axios from 'axios';

export interface IUser {
    name: string | null;
    roles: string[];
}

const authContext = createContext<IUser | null>(null);

interface IProps {
    children: React.ReactNode;
}

export const AuthProvider: FC<IProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);

    const fetchUser = useCallback(async (): Promise<IUser | null> => {
        try {
            startLoading();
            const { data }: { data: IUser } = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/user`,
            );

            stopLoading();
            return data;
        } catch {
            stopLoading();
            setAppError({
                mainError: "Couldn't fetch user!",
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

const useAuth = () => useContext(authContext);

export default useAuth;
