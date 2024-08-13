import {
  Controller,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller('KafkaMessageController')
export class KafkaMessageController implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('ticatch') private readonly kafkaClient: ClientKafka) {}

  async onModuleInit(): Promise<void> {
    await this.kafkaClient.connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.kafkaClient.close();
  }

  @MessagePattern('sum')
  replySum(@Payload() message: number[]): number {
    return message.reduce((a, b) => a + b);
  }

  @MessagePattern('max')
  replyMax(@Payload() message: number[]): number {
    return Math.max(...message);
  }

  @EventPattern('print')
  printEvent(@Payload() message: string): void {
    console.log('print:', message);
  }
}
