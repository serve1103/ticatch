import { KafkaOutboxModel, MessageState } from '@app/domain/models/kafka.model';

export interface KafkaRepository {
  findByState(status: MessageState): Promise<KafkaOutboxModel>;
  save(outbox: KafkaOutboxModel): Promise<boolean>;
}
