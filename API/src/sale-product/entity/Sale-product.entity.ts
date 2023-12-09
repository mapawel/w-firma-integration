import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../status/status.enum';
import { Supplier } from '../../supplier/supppliers.enum';
import { CodeTranslation } from 'src/code-translation/entity/Code-translation.entity';

@Entity()
export class SaleProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    supplierCode: string;

    @ManyToOne(
        () => CodeTranslation,
        (codeTranslation) => codeTranslation.products,
        { nullable: true },
    )
    productCode: CodeTranslation | undefined;

    @Column()
    quantity: number;

    @Column('float')
    netPrice: number;

    @Column()
    currency: string;

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
