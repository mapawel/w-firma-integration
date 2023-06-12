import { SystemProductResDTO } from '../dto/system-product-res.dto';

export abstract class CreateOrderBaseClass {
    public systemProductsMap: Map<string, string> = new Map();

    public updateSystemProductsMap(
        systemProducts: SystemProductResDTO[],
    ): void {
        for (const systemProduct of systemProducts) {
            this.systemProductsMap.set(
                systemProduct.productCode,
                systemProduct.systemId,
            );
        }
    }

    public getSystemProductIdFromCode(productCode: string): string {
        if (!this.systemProductsMap.size)
            throw new Error('First fire updateSystemProductsMap method!');
        const systemId: string | undefined =
            this.systemProductsMap.get(productCode);
        if (!systemId) throw new Error('no system product id available!');
        return systemId;
    }

    public abstract refreshProductsFromSystem(): Promise<boolean>;
    public abstract getCurrentSystemProducts(): Promise<SystemProductResDTO[]>;
    public abstract createSystemOrder(productsIds: number[]): Promise<string[]>;
}
