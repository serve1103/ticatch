import {
  Body,
  Controller,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { RecordMetadata } from '@nestjs/microservices/external/kafka.interface';
import { Observable, lastValueFrom } from 'rxjs';

@Controller('TestKafkaConsumer')
export class TestKafkaConsumer implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('ticatch') private readonly kafkaClient: ClientKafka) {}

  async onModuleInit(): Promise<void> {
    const topics = ['sum', 'max'];
    topics.forEach((topic) => this.kafkaClient.subscribeToResponseOf(topic));
    await this.kafkaClient.connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.kafkaClient.close();
  }

  /* return Observable<number> */
  @Post('sum')
  sum(@Body() body: number[]): Observable<number> {
    return this.kafkaClient.send('sum', { value: body });
  }

  /* return Promise<number> */
  @Post('max')
  async max(@Body() body: number[]): Promise<number> {
    const response = await lastValueFrom(
      this.kafkaClient.send<number>('max', { value: body }),
    );

    return response;
  }

  @Post('print')
  print(
    @Body() { message }: { message: string },
  ): Observable<RecordMetadata[]> {
    return this.kafkaClient.emit<RecordMetadata[]>('print', { value: message });
  }
}
