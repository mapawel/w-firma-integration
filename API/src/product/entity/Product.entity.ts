import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    supplierIndex: string;

    @Column()
    quantity: number;

    @Column('float')
    netPrice: number;

    @Column()
    currency: string;

    @Column()
    invoiceNumber: string;
}
