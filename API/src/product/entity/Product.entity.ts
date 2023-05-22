import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Status } from '../status/status.enum';
import { Invoice } from '../../invoice/entity/Invoice.entity';

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

    @ManyToOne(() => Invoice, (invoice) => invoice.products)
    invoice: Invoice;

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
