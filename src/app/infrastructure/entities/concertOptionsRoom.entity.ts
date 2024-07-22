import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ConcertOptionsRoom')
export class ConcertOptionsRoom {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  concertOptionsId: number;

  @Column()
  concertRoomNumber: number;

  @Column()
  concertRoomPrice: number;

  @Column()
  userId: string;

  @Column()
  state: 'TAKEN' | 'AVAILABLE';
}
