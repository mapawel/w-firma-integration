import { useState, useContext, createContext, FC } from 'react';

export interface ILoading {
    isLoading: boolean;
    setLoadingStart: () => void;
    setLoadingEnd: () => void;
}

const loadingContext = createContext<ILoading>({
    isLoading: true,
    setLoadingStart: () => {},
    setLoadingEnd: () => {},
});

type Props = {
    children?: React.ReactNode;
};

export const ProvideLoading: FC<Props> = ({ children }) => {
    const loading = useProvideLoading();
    return (
        <loadingContext.Provider value={loading}>
            {loading.isLoading ? <div>Loading...</div> : children}
        </loadingContext.Provider>
    );
};

export const useLoading = () => {
    return useContext(loadingContext);
};

const useProvideLoading = () => {
    const [isLoading, setLoading] = useState<boolean>(false);

    return {
        isLoading,
        setLoadingStart: (): void => setLoading(true),
        setLoadingEnd: (): void => setLoading(false),
    };
};
