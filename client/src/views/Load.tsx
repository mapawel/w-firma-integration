import { FC, useRef } from 'react';
import NavTemplate from '@/components/templates/Nav-template';
import { Label } from '@/components/atoms/Label';
import { setAppError } from '@/providers/app-status/use-app-status';
import axios from 'axios';

enum Supplier {
    AB = 'AB',
    OTHER = 'other',
}

enum Input {
    SUPPLIER = 'supplier',
    FILE = 'file',
}

const LoadView: FC = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const submitForm = async () => {
        if (!formRef.current)
            return setAppError({
                mainError: 'Ups, coś poszło nie tak. Spróbuj ponownie.',
                detailsArr: [],
            });

        const file: FormDataEntryValue | null = new FormData(
            formRef.current,
        ).get(Input.FILE);
        const supplier: FormDataEntryValue | null = new FormData(
            formRef.current,
        ).get(Input.SUPPLIER);

        if (!file || !supplier)
            return setAppError({
                mainError: 'Nie wybrano pliku lub dostawcy.',
                detailsArr: [],
            });

        // const r = await axios.post(
        //     '/api/files',
        //     { file, supplier },
        //     {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     },
        // );

        // console.log('r ----> ', r);
    };

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
                    <form
                        ref={formRef}
                        // encType="multipart/form-data"
                        className="space-y-6"
                    >
                        <legend className="sr-only">Suppliers</legend>

                        <div className="columns-2">
                            <div>
                                <input
                                    type="radio"
                                    name={Input.SUPPLIER}
                                    value={Supplier.AB}
                                    id={Supplier.AB}
                                    className="peer hidden [&:checked_+_label_svg]:block"
                                    checked
                                />

                                <Label htmlFor={Supplier.AB} label="AB S.A." />
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    name={Input.SUPPLIER}
                                    value={Supplier.OTHER}
                                    id={Supplier.OTHER}
                                    disabled={true}
                                    className="peer hidden [&:checked_+_label_svg]:block"
                                />

                                <Label htmlFor={Supplier.OTHER} label="Other" />
                            </div>
                        </div>

                        <div>
                            <input
                                type="file"
                                className="hidden"
                                name={Input.FILE}
                                id={Input.FILE}
                                onChange={submitForm}
                            />
                            <label
                                htmlFor={Input.FILE}
                                className="block cursor-pointer rounded-lg bg-primary px-5 py-3 font-medium text-white transition hover:bg-primaryHover focus:outline-none sm:w-auto"
                            >
                                <p>Wybierz plik ...</p>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </NavTemplate>
    );
};

export default LoadView;
