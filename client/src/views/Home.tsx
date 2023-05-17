import { FC } from 'react';
import NavTemplate from '@/components/templates/Nav-template';
import Card from '@/components/molecules/Card';
import { ReactComponent as Settings } from '@/assets/icons/setting.svg';
import { ReactComponent as Data } from '@/assets/icons/data.svg';
import { ReactComponent as Upload } from '@/assets/icons/upload.svg';
import GridTemplate from '@/components/templates/Grid-template';

const HomeView: FC = () => {
    return (
        <NavTemplate>
            <GridTemplate>
                <Card
                    title="Loader faktur zakupu"
                    description="Załaduj plik z fakturą zakupu w celu dodania towaru do systemu. Opcja powoduje wprowadzenie towaru na magazyn."
                    link="/load"
                    icon={
                        <Upload className="md:w-18 w-16 fill-secondaryLight" />
                    }
                />
                <Card
                    title="Przegląd faktur zakupu"
                    description="Przeglądaj załadowanie wcześniej faktury zakupu. Sprawdź status poszczególnych pozycji."
                    link="/invoices"
                    icon={<Data className="md:w-18 w-16 fill-secondaryLight" />}
                />
                <Card
                    title="Ustawienia i uprawnienia"
                    description="Sprawdź ustawienia swojego konta oraz zmień moćliwe opcje działania aplikacji."
                    link="/"
                    icon={
                        <Settings className="md:w-18 w-16 fill-secondaryLight" />
                    }
                />
            </GridTemplate>
        </NavTemplate>
    );
};

export default HomeView;
