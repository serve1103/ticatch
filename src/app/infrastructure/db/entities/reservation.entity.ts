import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  reservationId: number;

  @Column({
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  @Column()
  userId: string;

  @Column()
  concertId: number;

  @Column()
  concertOptionId: number;

  @Column()
  concertOptionRoomId: number;

  @Column()
  price: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @VersionColumn()
  version: number;
}
