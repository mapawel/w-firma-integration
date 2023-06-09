import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../product/entity/Product.entity';
import { Supplier } from '../../supplier/supppliers.enum';

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @Column()
    supplier: Supplier;

    @OneToMany(() => Product, (product) => product.invoice)
    products: Product[];

    @Column()
    addedBy: string;

    @Column()
    addedAt: Date;

    @Column({ nullable: true })
    updatedBy: string;

    @Column({ nullable: true })
    updatedAt: Date;
}
