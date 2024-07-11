import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Concert')
export class Concert {
  @PrimaryGeneratedColumn()
  concertIdx: number;

  @Column()
  concertName: string;
}
