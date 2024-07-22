import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn('uuid')
  token: string;

  @Column()
  userId: string;

  @Column()
  position: number;

  @Column()
  estimatedWaitTime: number;

  @CreateDateColumn()
  createdAt: Date;
}
