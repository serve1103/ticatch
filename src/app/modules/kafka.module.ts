import { TestKafkaConsumer } from '@app/presentation/consumer/test.Success.consumer';
import { KafkaMessageController } from '@app/presentation/consumer/test.message.consumer';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { kafkaOptions } from '@root/config/kafka.option'; // 옵션 가져오기

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ticatch',
        ...kafkaOptions, // 옵션 적용
      },
    ]),
  ],
  controllers: [TestKafkaConsumer, KafkaMessageController],
})
export class KafkaModule {}
