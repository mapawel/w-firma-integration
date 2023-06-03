import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Status } from '../status/status.enum';
import { Invoice } from '../../invoice/entity/Invoice.entity';
import { Supplier } from '../../supplier/supppliers.enum';
import { CodeTranslation } from 'src/code-translation/entity/Code-translation.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    supplierCode: string;

    @ManyToOne(
        () => CodeTranslation,
        (codeTranslation) => codeTranslation.products,
        { nullable: true },
    )
    PN: CodeTranslation | undefined;

    @Column()
    quantity: number;

    @Column('float')
    netPrice: number;

    @Column()
    currency: string;

    @ManyToOne(() => Invoice, (invoice) => invoice.products)
    invoice: Invoice;

    @Column()
    supplier: Supplier;

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
