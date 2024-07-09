import { Binary, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  userInfoIdx: number;

  @Column()
  userId: string;

  @Column()
  userPw: string;

  @Column()
  userName: string;

  @Column()
  userEmail: string;

  @Column()
  token?: Binary;
}
