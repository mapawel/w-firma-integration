import { FC } from 'react';

interface IProps {
    title: string;
    description: string;
    link: string;
    icon: any;
}

const Card: FC<IProps> = ({ title, description, link, icon }) => {
    return (
        <a
            className="relative flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-md sm:p-6 lg:p-8"
            href={link}
        >
            <div className="px-2 py-4">
                {icon}
                <h2 className="my-6 mt-8 text-xl font-bold md:text-2xl">
                    {title}
                </h2>
                <p className="mt-4 text-sm text-secondary">{description}</p>
            </div>
        </a>
    );
};
export default Card;
