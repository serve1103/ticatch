import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserAmountHistory')
export class UserAmountHistory {
  @PrimaryGeneratedColumn()
  userAmountHistory: number;
  @Column()
  userId: string;
  @Column()
  userAmount: number;
  @Column()
  Gubun: 'CHARGE' | 'USE';
}
