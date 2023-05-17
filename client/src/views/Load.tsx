import { FC } from 'react';
import NavTemplate from '@/components/templates/Nav-template';

const LoadView: FC = () => {
    return (
        <NavTemplate>
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                <ul className="list-outside list-decimal space-y-3 pl-6 text-sm text-secondary lg:col-span-2 lg:py-12">
                    <li>Zaznacz, którego dostawcę dokuemnt wprowadzasz.</li>
                    <li>
                        Następnie wybierz plik do załadowania klikając przycisk.
                    </li>
                    <li>
                        Po wybraniu i zatwierdzeniu pliku w nowym oknie
                        systemowym, otrzymasz informację zwrotną z walidatora
                        oraz status operacji.
                    </li>
                </ul>

                <div className="rounded-lg border border-gray-100 p-8 shadow-md lg:col-span-3 lg:p-12">
                    <form action="" className="space-y-6">
                        <legend className="sr-only">Suppliers</legend>

                        <div>
                            <input
                                type="radio"
                                name="Supplier"
                                value="AB"
                                id="AB"
                                className="peer hidden [&:checked_+_label_svg]:block"
                                checked
                            />

                            <label
                                htmlFor="AB"
                                className="block cursor-pointer rounded-lg border border-secondaryLight p-4 text-sm font-medium shadow-sm hover:border-secondary peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary"
                            >
                                <div className="flex items-center justify-between">
                                    <p>AB S.A.</p>

                                    <svg
                                        className="hidden h-5 w-5 text-primary"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="Supplier"
                                value="Other"
                                id="Other"
                                disabled={true}
                                className="peer hidden [&:checked_+_label_svg]:block"
                            />

                            <label
                                htmlFor="Other"
                                className="block cursor-pointer rounded-lg border border-secondaryLight p-4 text-sm font-medium shadow-sm hover:border-secondary peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary"
                            >
                                <div className="flex items-center justify-between">
                                    <p>Other</p>

                                    <svg
                                        className="hidden h-5 w-5 text-primary"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </label>
                        </div>

                        <button
                            type="button"
                            className="inline-block w-full rounded-lg bg-primary px-5 py-3 font-medium text-white transition hover:bg-primaryHover focus:outline-none sm:w-auto"
                        >
                            Wybierz plik ...
                        </button>
                    </form>
                </div>
            </div>
        </NavTemplate>
    );
};

export default LoadView;
