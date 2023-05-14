import {
    useState,
    useEffect,
    useContext,
    createContext,
    FC,
    useCallback,
} from 'react';
import axios from 'axios';

export interface IUser {
    name: string;
    roled: string[];
}

export interface IAuth {
    user: IUser | null;
    getuser: () => Promise<IUser | null>;
    signout: () => Promise<boolean>;
}

const authContext = createContext<IAuth>({
    user: null,
    getuser: async () => null,
    signout: async () => false,
});

type Props = {
    children?: React.ReactNode;
};

export const ProvideAuth: FC<Props> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = () => {
    const [user, setUser] = useState<IUser | null>(null);

    const signout = async (): Promise<boolean> => {
        console.log('signout ----> ', signout);
        return true;
    };

    const getuser = useCallback(async (): Promise<IUser | null> => {
        try {
            const { data }: { data: IUser } = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/user`,
            );

            return data;
        } catch {
            return null;
        }
    }, []);

    useEffect(() => {
        (async () => {
            const fetchedUser: IUser | null = await getuser();
            setUser(fetchedUser);
        })();
    }, [getuser]);

    return {
        user,
        getuser,
        signout,
    };
};
