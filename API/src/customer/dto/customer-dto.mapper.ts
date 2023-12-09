import {
    Contractors,
    ContractorWrapped,
} from '../../integrated-systems/wfirma/create-order/dto/from-system-customers-res.dto';
import { CustomerDTO } from './customer.dto';
import { CustomerException } from '../exceptions/customer.exception';

export class CustomerDtoMapper {
    mapToCustomerDtos(contractors: Contractors): CustomerDTO[] {
        if (!contractors)
            throw new CustomerException(
                'no contractors object in data fetched from W-Firma',
            );

        return this.objectToArray(contractors).map(
            (contractor: ContractorWrapped) => ({
                id: contractor.contractor.id,
                name: contractor.contractor.name,
            }),
        );
    }

    private objectToArray(contractors: Contractors): ContractorWrapped[] {
        try {
            const contractorsArr: ContractorWrapped[] = [];
            for (const record of Object.values(contractors)) {
                if (!record.contractor) break;
                contractorsArr.push(record);
            }

            return contractorsArr;
        } catch (err) {
            throw new CustomerException(
                'something wrong while trying map contractors from W-Firma',
            );
        }
    }
}
