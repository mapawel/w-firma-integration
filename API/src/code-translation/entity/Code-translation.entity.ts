import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Supplier } from '../../supplier/supppliers.enum';
import { Product } from '../../product/entity/Product.entity';

@Entity()
export class CodeTranslation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    supplier: Supplier;

    @Column()
    supplierCode: string;

    @Column()
    PN: string;

    @Column()
    addedBy: string;

    @Column()
    addedAt: Date;

    @Column({ nullable: true })
    updatedBy: string;

    @Column({ nullable: true })
    updatedAt: Date;

    @OneToMany(() => Product, (product) => product.productCode)
    products: Product[];
}
