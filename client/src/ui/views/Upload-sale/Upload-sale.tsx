import { FC, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import NavTemplate from '@/ui/components/templates/Nav-template';
import { Label } from '@/ui/components/atoms/Label';
import { upladFileForm } from '@/domains/invoice-upload/actions/upload-file-form';
import { Input } from '@/ui/views/Upload/Input.enum';
import { Cur } from './Cur.enum';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { uploadSaleInstruction } from '@/ui/views/Upload/data/upload-sale-instruction.text';
import { selectStyle } from '@/ui/components/organisms/Table-top-header/select-style';
import { UploadTypeEnum } from '@/ui/views/Upload/data/Upload-type.enum';
import { selectStyleInvoiceAddon } from '@/ui/views/Upload-sale/select-style-invoice.addon';
import { fetchCustomers } from '@/domains/customers/actions/fetch-customers';
import { CustomersResDTO } from '@/domains/customers/dto/customers-res.dto';
import { ResponseFromCustomersFetchDto } from '@/domains/customers/dto/response-from-customers-fetch.dto';

const UploadView: FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [customers, setCustomers] = useState<CustomersResDTO[]>([]);
    const [isValid, setValid] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        (async () => {
            const customersResult: void | ResponseFromCustomersFetchDto =
                await fetchCustomers();
            if (customersResult?.customers.length)
                setCustomers(customersResult.customers);
        })();
    }, []);

    return (
        <NavTemplate>
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                <ul className="list-outside list-decimal space-y-3 pl-6 text-sm text-secondary lg:col-span-2 lg:py-12">
                    {uploadSaleInstruction.map(
                        (instruction: string, index: number) => (
                            <li key={index}>{instruction}</li>
                        ),
                    )}
                </ul>

                <div className="rounded-lg border border-gray-100 p-8 shadow-md lg:col-span-3 lg:p-12">
                    <form ref={formRef} className="space-y-6">
                        <legend className="sr-only">Sale params:</legend>

                        <div>
                            <input
                                type="radio"
                                name={Input.TYPE}
                                value={UploadTypeEnum.SALE}
                                id={UploadTypeEnum.SALE}
                                className="peer hidden [&:checked_+_label_svg]:block"
                                defaultChecked={true}
                            />

                            <Label
                                htmlFor={UploadTypeEnum.SALE}
                                label="tworzenie zlecenia sprzedaży"
                            />
                        </div>

                        <Select
                            id="customer"
                            options={customers.map((customer) => ({
                                value: customer.id,
                                label: customer.name,
                            }))}
                            className="w-full"
                            name={Input.SUPPLIER}
                            placeholder="Klient..."
                            styles={{
                                ...selectStyle,
                                ...selectStyleInvoiceAddon,
                            }}
                            onChange={(selected) => {
                                if (selected?.value) setValid(true);
                            }}
                        />

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
                                disabled={!isValid}
                                name={Input.FILE}
                                id={Input.FILE}
                                onChange={() =>
                                    upladFileForm(formRef, navigate, customers)
                                }
                            />
                            <label
                                htmlFor={Input.FILE}
                                className={`block rounded-lg px-5 py-3 font-medium text-white transition sm:w-auto ${
                                    isValid
                                        ? 'cursor-pointer bg-primary hover:bg-primaryHover focus:outline-none'
                                        : 'bg-secondary'
                                }`}
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
