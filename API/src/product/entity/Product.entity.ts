import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    supplierIndex: string;

    @Column()
    quantity: number;

    @Column()
    netPrice: number;

    @Column()
    currency: string;

    // invoiceNumber: string;
}
