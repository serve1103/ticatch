import { KafkaRepository } from '@app/domain/interfaces/kafka.repository.interface';
import { KafkaOutboxModel, MessageState } from '@app/domain/models/kafka.model';
import { Injectable } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class OutboxWriter implements KafkaRepository {
  async findByState(status: MessageState): Promise<KafkaOutboxModel> {
    return;
  }
  async save(outbox: KafkaOutboxModel): Promise<boolean> {
    return;
  }
}
