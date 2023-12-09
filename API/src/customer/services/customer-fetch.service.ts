import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CustomerException } from '../exceptions/customer.exception';
import { FromSystemCustomersResDTO } from '../../integrated-systems/wfirma/create-order/dto/from-system-customers-res.dto';
import { CustomersResDTO } from '../dto/customers-res.dto';
import { CustomerDtoMapper } from '../dto/customer-dto.mapper';

@Injectable()
export class CustomerFetch {
    constructor(
        private readonly configService: ConfigService,
        private readonly customersMapper: CustomerDtoMapper,
    ) {}

    public async getAllCustomers(): Promise<CustomersResDTO> {
        try {
            const { data }: { data: FromSystemCustomersResDTO } =
                await axios.get(
                    `${this.configService.get(
                        'W_FIRMA_API_URL',
                    )}${this.configService.get(
                        'W_FIRMA_FIND_CONTRACTORS_URL',
                    )}${this.configService.get('W_FIRMA_COMPANY_ID')}`,
                    {
                        data: this.buildRequestGetCustomers(),
                        headers: {
                            accessKey: this.configService.get('ACCESS_KEY', ''),
                            secretKey: this.configService.get('SECRET_KEY', ''),
                            appKey: this.configService.get('APP_KEY', ''),
                        },
                    },
                );

            return {
                customers: this.customersMapper.mapToCustomerDtos(
                    data.contractors,
                ),
            };
        } catch (err) {
            throw new CustomerException(`Error while getting customers.`, {
                cause: err,
            });
        }
    }

    private buildRequestGetCustomers(): string {
        return `
        {
            "api": {
                "contractors": {
                    "parameters": {
                        "page": 1,
                        "limit": 1000,
                        "fields": [
                            {
                                "field": "id"
                            },
                            {
                                "field": "name"
                            }
                        ]
                    }
                }
            }
        }           
        `;
    }
}
