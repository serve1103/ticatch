import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AmountEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  userId: string;

  @Column()
  userAmount: number;
}
