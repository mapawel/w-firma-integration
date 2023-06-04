import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SystemProductResDTO } from '../../../integrations/create-order/dto/system-product-res.dto';
import { FromSystemProductsResDTO } from './dto/from-system-products-res.dto';
import { CreateOrderBaseClass } from '../../../integrations/create-order/interface/create-order.base-class';
import { ProductResDTO } from '../../../product/dto/product-res.dto';
import { findAllGoodsPayload } from './api-payloads/find-all-goods.payload';
import { mapToSystemProductResDto } from './dto/system-product.mapper';

@Injectable()
export class CreateOrderService extends CreateOrderBaseClass {
    constructor(private readonly configService: ConfigService) {
        super();
    }

    public async refreshProductsFromSystem(): Promise<boolean> {
        this.updateSystemProductsMap(await this.getCurrentSystemProducts());
        return true;
    }

    public async getCurrentSystemProducts(): Promise<SystemProductResDTO[]> {
        try {
            const { data }: { data: FromSystemProductsResDTO } =
                await axios.get(
                    `${this.configService.get(
                        'W_FIRMA_API_URL',
                    )}${this.configService.get(
                        'W_FIRMA_FIND_GOODS_URL',
                    )}${this.configService.get('W_FIRMA_COMPANY_ID')}`,
                    {
                        data: findAllGoodsPayload,
                        headers: {
                            accessKey: this.configService.get('ACCESS_KEY', ''),
                            secretKey: this.configService.get('SECRET_KEY', ''),
                            appKey: this.configService.get('APP_KEY', ''),
                        },
                    },
                );

            return mapToSystemProductResDto(data);
        } catch (err) {
            throw new Error('problem with downloading products from w-firma', {
                cause: err,
            });
        }
    }

    public async createSystemOrder(
        productsArr: ProductResDTO[],
    ): Promise<boolean> {
        return true;
    }
}
