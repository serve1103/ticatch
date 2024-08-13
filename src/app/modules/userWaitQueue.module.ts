import { Module } from '@nestjs/common';
import { UserWaitQueueController } from '@app/presentation/api/userWaitQueue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWaitQueue } from '@app/infrastructure/db/entities/userWaitQueue.entity';
import { RedisModule } from '@app/modules/redis.module';
import { UserWaitQueueUseCase } from '@app/application/userWaitQueue.use-case';
import { UserWaitQueueService } from '@app/domain/services/userWaitQueue.service';
import { userWaitQueueSymbol } from '@app/domain/interfaces/userWaitQueue.repository.interface';
import { UserWaitQueueRepositoryImpl } from '@app/infrastructure/db/repositories/userWaitQueue.repository';
import { UserInfoModule } from '@app/modules/userInfo.module';
import { RedisService } from '@app/infrastructure/redis/redis.client';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserWaitQueue]),
    RedisModule,
    UserInfoModule,
  ],
  controllers: [UserWaitQueueController],
  providers: [
    UserWaitQueueUseCase,
    UserWaitQueueService,
    RedisService,
    {
      provide: userWaitQueueSymbol,
      useClass: UserWaitQueueRepositoryImpl,
    },
  ],
})
export class UserWaitQueueModule {}
