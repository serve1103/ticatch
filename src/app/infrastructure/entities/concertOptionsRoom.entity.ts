import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

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
  state: ConcertRoomState;

  @VersionColumn()
  version: number;
}

export enum ConcertRoomState {
  TAKEN = 'TAKEN',
  AVAILABLE = 'AVAILABLE',
}
