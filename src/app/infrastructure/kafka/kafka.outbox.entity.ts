import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class KafkaOutbox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  @Column()
  key: string;

  @Column()
  message: string;

  @Column()
  status: MessageState;

  @CreateDateColumn()
  creatAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}

enum MessageState {
  INIT = 'INIT',
  PUBLISHED = 'PUBLISHED',
}
