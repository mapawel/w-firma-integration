import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NonceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nonce: string;
}
