import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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

  @Column({ type: 'blob', nullable: true })
  token?: Buffer; // Binary 대신 Buffer 사용
}
