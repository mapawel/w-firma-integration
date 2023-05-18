import { FC } from 'react';
import { Portal } from 'react-portal';
import useAppStatus from '@/providers/app-status/use-app-status';
import { store } from '@/providers/app-status/store/app-status-store';
import { ActionType } from '@/providers/app-status/store/interfaces';

interface IProps {
    children: React.ReactNode;
}

const AppStatusProvider: FC<IProps> = ({ children }) => {
    const { isLoading, info, error } = useAppStatus();

    return (
        <>
            {children}
            {isLoading ? (
                <Portal>
                    <div className="absolute left-0 top-0 h-max w-max bg-slate-400">
                        <h1>loading...</h1>
                    </div>
                </Portal>
            ) : null}
            {info?.mainInfo && (
                <Portal>
                    <div>
                        <p>{info.mainInfo}</p>
                        <p>{info.detailsArr}</p>
                    </div>
                </Portal>
            )}
            {error?.mainError && (
                <Portal>
                    <div
                        style={{
                            backgroundColor: '#00000010',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                        }}
                    >
                        <p>{error.mainError}</p>
                        <p>{error.detailsArr}</p>
                        <button
                            onClick={
                                error.callbackClearError
                                    ? error.callbackClearError
                                    : () =>
                                          store.dispatch({
                                              type: ActionType.CLEAN_ERROR,
                                          })
                            }
                        >
                            CLEAN ERROR !
                        </button>
                    </div>
                </Portal>
            )}
        </>
    );
};

export default AppStatusProvider;
