import { KafkaOutboxModel, MessageState } from '@app/domain/models/kafka.model';

export const KafkaRepositorySymbol = Symbol.for('KafkaRepository');

export interface KafkaRepository {
  findByState(status: MessageState): Promise<KafkaOutboxModel[]>;
  save(outbox: KafkaOutboxModel): Promise<boolean>;
}
