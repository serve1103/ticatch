import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserWaitQueue')
export class UserWaitQueue {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  userId: string;

  @Column()
  state: 'WAITING' | 'USING' | 'DONE';
}
