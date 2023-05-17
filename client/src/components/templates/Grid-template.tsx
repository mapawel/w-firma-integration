import { FC } from 'react';

interface IProps {
    children: React.ReactNode;
}

const GridTemplate: FC<IProps> = ({ children }) => {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{children}</div>;
};
export default GridTemplate;
