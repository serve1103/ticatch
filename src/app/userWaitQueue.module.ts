import { Module } from '@nestjs/common';
import { UserWaitQueueController } from './presentation/userWaitQueue.controller';

@Module({
  controllers: [UserWaitQueueController],
  providers: [],
})
export class UserWaitQueueModule {}
