import { FC } from 'react';
import { Portal } from 'react-portal';
import useAppStatus from '@/providers/app-status/use-app-status';
import ModalTemplate from '@/components/templates/Modal-template';

interface IProps {
    children: React.ReactNode;
}

const AppStatusProvider: FC<IProps> = ({ children }) => {
    const { isLoading, data } = useAppStatus();

    return (
        <>
            {children}
            {isLoading ? (
                <Portal>
                    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center overflow-hidden bg-darkGlass">
                        <div>
                            <h1 className="text-2xl text-white md:text-3xl">
                                loading...
                            </h1>
                        </div>
                    </div>
                </Portal>
            ) : null}

            {data?.mainInfo && (
                <Portal>
                    <ModalTemplate data={data} />
                </Portal>
            )}
        </>
    );
};

export default AppStatusProvider;
