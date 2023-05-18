import { FC } from 'react';
import NavTemplate from '@/components/templates/Nav-template';
import Card from '@/components/molecules/Card';
import GridTemplate from '@/components/templates/Grid-template';
import { navigationData } from '@/navigation/data';
import { NavigationDataItem } from '@/navigation/navigation-item.type';

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
