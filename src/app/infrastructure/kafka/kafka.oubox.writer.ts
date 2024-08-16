import { KafkaRepository } from '@app/domain/interfaces/kafka.repository.interface';
import { KafkaOutboxModel, MessageState } from '@app/domain/models/kafka.model';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSourceOptions, Repository } from 'typeorm';
import { KafkaOutbox } from '@app/infrastructure/kafka/kafka.outbox.entity';

@Injectable()
export class OutboxWriter implements KafkaRepository {
  constructor(
    @InjectRepository(KafkaOutbox)
    private readonly kafkaOutboxRepository: Repository<KafkaOutbox>,
  ) {}
  async findByState(status: MessageState): Promise<KafkaOutboxModel[]> {
    return await this.kafkaOutboxRepository.find({
      where: { status: MessageState.INIT },
    });
  }
  async save(outbox: KafkaOutboxModel): Promise<boolean> {
    return await this.kafkaOutboxRepository.save(outbox);
  }
}
