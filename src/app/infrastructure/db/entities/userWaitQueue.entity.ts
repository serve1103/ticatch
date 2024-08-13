import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserWaitQueue')
export class UserWaitQueue {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  userId: string;

  @Column()
  state: QueueState;

  @Column()
  createdAt: Date;

  @Column()
  expiredAt: Date;
}

export enum QueueState {
  WAITING = 'WAITING',
  USING = 'USING',
  DONE = 'DONE',
}
