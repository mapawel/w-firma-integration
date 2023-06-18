import { FC } from 'react';

interface IProps {
    isDropdownOpen: boolean;
}

export const TableDropdown: FC<IProps> = ({ isDropdownOpen }) => {
    return (
        <div
            id="actionsDropdown"
            className={`absolute right-0 top-full z-10 mt-2 w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700 ${
                !isDropdownOpen && 'hidden'
            }`}
        >
            <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="actionsDropdownButton"
            >
                <li>
                    <a
                        href="https://www.wp.pl"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Mass Edit
                    </a>
                </li>
            </ul>
            <div className="py-1">
                <a
                    href="https://www.wp.pl"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    Delete all
                </a>
            </div>
        </div>
    );
};
