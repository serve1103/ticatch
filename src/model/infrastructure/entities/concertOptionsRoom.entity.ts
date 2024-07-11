import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ConcertOptionsRoom')
export class ConcertOptionsRoom {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  concertRoomNumber: number;

  @Column()
  userId: string;
}
