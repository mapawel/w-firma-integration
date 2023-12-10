import NavTemplate from '@/ui/components/templates/Nav-template';
import { ClientRoutes } from '@/navigation/routes/client.routes';
import { FC } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UploadCodesResDTO } from '@/ui/views/Upload-result/Upload-codes-result.type';
import { toFixedNum } from '@/global-helpers/to-fixed-num';
import { uploadCodesToDB } from '@/domains/invoice-upload/actions/upload-codes-to-db';
import {
    cleanAppData,
    setAppData,
} from '@/data-providers/app-status/use-app-status';

const ResultViewCodes: FC = () => {
    const navigate = useNavigate();
    const { state }: { state: { uploadResult: UploadCodesResDTO } } =
        useLocation();
    const { uploadResult: { data = [], totalPositions = 0 } = {} } =
        state || {};

    const handleUpdateCodeTranslations = async (): Promise<void> => {
        console.log(data);
        const responseData: true | void = await uploadCodesToDB({
            data,
            totalPositions,
        });
        if (!responseData) return;
        //
        setAppData({
            mainInfo: 'Pomyślnie dodano tłumaczenia kodów do słownika.',
            detailsArr: [],
            callbackClearInfo: () => {
                cleanAppData();
                navigate(ClientRoutes.UPLOAD, { replace: true });
            },
            callbackClearInfoLabel: 'OK',
        });
    };

    const handleCancel = (): void =>
        navigate(ClientRoutes.UPLOAD, { replace: true });

    return (
        <>
            {!state && <Navigate to="/upload" replace={true} />}

            <NavTemplate>
                <h1 className="mb-4 text-2xl font-semibold">
                    Odczytano z załadowanego pliku:
                </h1>
                <div className="mb-8 flex gap-10">
                    <div>
                        <h3 className="text-xl">Dostawca:</h3>
                        <h3 className="text-xl">Ilość pozycji słownika:</h3>
                    </div>
                    <div>
                        <p className="text-right text-xl font-semibold">
                            {data?.[0].supplier?.toUpperCase()}
                        </p>
                        <p className="text-right text-xl font-semibold">
                            {toFixedNum(totalPositions, 0)}
                        </p>
                    </div>
                </div>
                <div className="mb-10 flex gap-4">
                    <button
                        className="rounded-md bg-primary px-5 py-2.5 text-sm text-white transition duration-150 hover:bg-primaryHover"
                        onClick={handleUpdateCodeTranslations}
                    >
                        DODAJ / ZMIEN SŁOWNIK
                    </button>
                    <button
                        className="rounded-md bg-cta px-5 py-2.5 text-sm text-white transition duration-150 hover:bg-ctaHover"
                        onClick={handleCancel}
                    >
                        PRZERWIJ / WYJDŹ
                    </button>
                </div>
            </NavTemplate>
        </>
    );
};

export default ResultViewCodes;
