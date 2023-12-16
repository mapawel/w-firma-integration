import { FromSystemProductsResDTO } from './from-system-products-res.dto';
import { SystemProductResDTO } from 'src/integrations/create-order/dto/system-product-res.dto';

export const mapToSystemProductResDto = (
    fromSystemProduct: FromSystemProductsResDTO,
): SystemProductResDTO[] => {
    const systemProductResDtos: SystemProductResDTO[] = [];
    const goods = fromSystemProduct?.goods;

    if (!goods) {
        throw new Error('goods are empty');
    }

    for (const record of Object.values(goods)) {
        if (!record.good) break;

        const systemProductResDto: SystemProductResDTO = {
            systemId: record.good.id,
            productCode: record.good.code,
        };
        systemProductResDtos.push(systemProductResDto);
    }
    return systemProductResDtos;
};
