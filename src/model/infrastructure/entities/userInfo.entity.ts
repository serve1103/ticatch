import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserInfo')
export class UserInfo {
  @PrimaryGeneratedColumn()
  userInfoIdx: number;

  @Column({ type: 'varchar', length: 100 })
  userId: string;

  @Column({ type: 'varchar', length: 100 })
  userPw: string;

  @Column({ type: 'varchar', length: 100 })
  userName: string;

  @Column({ type: 'varchar', length: 100 })
  userEmail: string;

  @Column({ type: 'varbinary', nullable: true })
  token?: Buffer;
}
