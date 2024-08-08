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

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  state: ConcertRoomState;

  @VersionColumn()
  version: number;
}

export enum ConcertRoomState {
  TAKEN = 'TAKEN',
  AVAILABLE = 'AVAILABLE',
}
