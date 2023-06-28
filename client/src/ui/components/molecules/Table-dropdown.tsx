import { useCheckboxes } from '@/data-providers/check-boxes-provider/use-check-boxes';
import { FC } from 'react';

interface IProps {
    isDropdownOpen: boolean;
}

export const TableDropdown: FC<IProps> = ({ isDropdownOpen }) => {
    const { checked } = useCheckboxes();

    return (
        <div
            id="actionsDropdown"
            className={`absolute right-0 top-full z-10 mt-2 w-72 divide-y rounded bg-white shadow dark:bg-black ${
                !isDropdownOpen && 'hidden'
            }`}
        >
            {checked.length > 0 ? (
                <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="actionsDropdownButton"
                >
                    <li>
                        <button className="w-full border-none bg-transparent px-4 py-2 uppercase hover:bg-secondaryLight hover:text-white dark:hover:bg-secondary">
                            Stwórz zamówienie
                        </button>
                    </li>
                    <li>
                        <button className="w-full border-none bg-transparent px-4 py-2 uppercase hover:bg-secondaryLight hover:text-white dark:hover:bg-secondary">
                            Usuń zaznaczone
                        </button>
                    </li>
                </ul>
            ) : (
                <div className="m-6">
                    <span className='text-secondaryLight text-center block italic'>zaznacz produkty</span>
                </div>
            )}
        </div>
    );
};
