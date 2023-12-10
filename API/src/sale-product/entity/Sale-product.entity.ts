import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../status/status.enum';
import { CodeTranslation } from 'src/code-translation/entity/Code-translation.entity';

@Entity()
export class SaleProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: string;

    @Column({ nullable: true })
    reservationId: string;

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
