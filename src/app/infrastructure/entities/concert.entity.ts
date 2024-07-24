import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Concert')
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  concertName: string;
}
