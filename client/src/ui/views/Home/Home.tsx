import { FC } from 'react';
import NavTemplate from '@/ui/components/templates/Nav-template';
import Card from '@/ui/components/molecules/Card';
import GridTemplate from '@/ui/components/templates/Grid-template';
import { navigationData } from '@/navigation/data/navigation.data';
import { NavigationDataItem } from '@/navigation/types/navigation-item.type';

const HomeView: FC = () => {
    return (
        <NavTemplate>
            <GridTemplate>
                {navigationData.map(({ cardData }: NavigationDataItem) => {
                    if (!cardData) return null;
                    return (
                        <Card
                            key={cardData.title}
                            title={cardData.title}
                            description={cardData.description}
                            link={cardData.path}
                            icon={cardData.icon}
                        />
                    );
                })}
            </GridTemplate>
        </NavTemplate>
    );
};

export default HomeView;
