import { FC, useRef } from "react";
import NavTemplate from "@/ui/components/templates/Nav-template";
import { Label } from "@/ui/components/atoms/Label";
import { upladFileForm } from "@/domains/invoice-upload/actions/upload-file-form";
import { Input } from "@/ui/views/Upload/Input.enum";
import { Supplier } from "@/ui/views/Upload/Supplier.enum";
import { Cur } from "./Cur.enum";
import { uploadInstruction } from "@/ui/views/Upload/data/upload-instruction.text";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { UploadTypeEnum } from "@/ui/views/Upload/data/Upload-type.enum";

const UploadView: FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const navigate: NavigateFunction = useNavigate();

    return (
        <NavTemplate>
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                <ul className="list-outside list-decimal space-y-3 pl-6 text-sm text-secondary lg:col-span-2 lg:py-12">
                    {uploadInstruction.map(
                        (instruction: string, index: number) => (
                            <li key={index}>{instruction}</li>
                        )
                    )}
                </ul>

                <div className="rounded-lg border border-gray-100 p-8 shadow-md lg:col-span-3 lg:p-12">
                    <form ref={formRef} className="space-y-6">
                        <legend className="sr-only">Puchase params:</legend>

                        <div className="columns-2">
                            <div>
                                <input
                                    type="radio"
                                    name={Input.TYPE}
                                    value={UploadTypeEnum.PRODUCTS}
                                    id={UploadTypeEnum.PRODUCTS}
                                    className="peer hidden [&:checked_+_label_svg]:block"
                                    defaultChecked={true}
                                />

                                <Label
                                    htmlFor={UploadTypeEnum.PRODUCTS}
                                    label="ładowanie faktury"
                                />
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    name={Input.TYPE}
                                    value={UploadTypeEnum.CODES}
                                    id={UploadTypeEnum.CODES}
                                    className="peer hidden [&:checked_+_label_svg]:block"
                                />

                                <Label
                                    htmlFor={UploadTypeEnum.CODES}
                                    label="ładowanie słownika"
                                />
                            </div>
                        </div>

                        <div className="columns-3">
                            <div>
                                <input
                                    type="radio"
                                    name={Input.SUPPLIER}
                                    value={Supplier.AB}
                                    id={Supplier.AB}
                                    className="peer hidden [&:checked_+_label_svg]:block"
                                    defaultChecked={true}
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

                                <Label
                                    htmlFor={Supplier.OTHER}
                                    label="not existing yet ..."
                                />
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

                                <Label
                                    htmlFor={Supplier.OTHER}
                                    label="not existing yet ..."
                                />
                            </div>
                        </div>

                        <div className="columns-2">
                            <div>
                                <input
                                    type="radio"
                                    name={Input.CUR}
                                    value={Cur.PLN}
                                    id={Cur.PLN}
                                    className="peer hidden [&:checked_+_label_svg]:block"
                                    defaultChecked={true}
                                />

                                <Label htmlFor={Cur.PLN} label="PLN" />
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    name={Input.CUR}
                                    value={Cur.EUR}
                                    id={Cur.EUR}
                                    className="peer hidden [&:checked_+_label_svg]:block"
                                />

                                <Label htmlFor={Cur.EUR} label="EUR" />
                            </div>
                        </div>

                        <div>
                            <input
                                type="file"
                                className="hidden"
                                name={Input.FILE}
                                id={Input.FILE}
                                onChange={() =>
                                    upladFileForm(formRef, navigate)
                                }
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

export default UploadView;
