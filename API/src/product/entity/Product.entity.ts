import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Status } from '../status/status.enum';

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

    @Column()
    supplier: string;

    @Column()
    status: Status;

    @Column()
    addedBy: string;

    @Column()
    addedAt: Date;

    @Column({ nullable: true })
    updatedBy: string;

    @Column({ nullable: true })
    updatedAt: Date;
}
