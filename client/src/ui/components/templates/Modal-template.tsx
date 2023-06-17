import { FC } from 'react';
import { cleanAppData } from '@/data-providers/app-status/use-app-status';
import { Data } from '@/data-providers/app-status/types/data.type';

interface IProps {
    data: Data;
}

const ModalTemplate: FC<IProps> = ({ data }) => (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center overflow-hidden bg-darkGlass">
        <div className="container mx-auto overflow-y-auto rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-3 shadow-xl">
            <div className="block rounded-xl bg-white p-6 sm:p-8 lg:p-12">
                <h3 className="mb-12 font-semibold leading-8 text-black sm:text-xl sm:leading-10">
                    {data.mainInfo}
                </h3>
                <ul>
                    {data.detailsArr.map((detail, index) => (
                        <li
                            key={index}
                            className="mb-3 block text-secondary lg:text-xl"
                        >
                            {detail}
                        </li>
                    ))}
                </ul>
                <button
                    className="ml-auto block cursor-pointer rounded-lg bg-primary px-5 py-3 font-medium text-white transition hover:bg-primaryHover focus:outline-none sm:w-auto"
                    onClick={
                        data.callbackClearInfo
                            ? data.callbackClearInfo
                            : cleanAppData
                    }
                >
                    {data.callbackClearInfoLabel
                        ? data.callbackClearInfoLabel
                        : 'CLOSE'}
                </button>
            </div>
        </div>
    </div>
);
export default ModalTemplate;
