import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  price: number;

  @Column()
  state: PaymentState;

  @Column()
  createdAt: Date;
}

enum PaymentState {
  WAITING = 'WAITING',
  DONE = 'DONE',
}
