import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserAmount')
export class UserAmount {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  userId: string;

  @Column()
  userAmount: number;
}
