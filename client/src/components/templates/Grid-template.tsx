import { FC } from 'react';

interface IProps {
    children: React.ReactNode;
}

const GridTemplate: FC<IProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">{children}</div>
    );
};
export default GridTemplate;
