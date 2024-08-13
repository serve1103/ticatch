import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ConcertOptions')
export class ConcertOptions {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  concertIdx: number;

  @Column()
  concertOpenedDate: Date;

  @Column()
  concertClosedDate: Date;

  @Column()
  concertMaxCapacity: number;

  @Column()
  concertApplyCapacity: number;
}
