import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import {
  UserWaitQueueRepository,
  userWaitQueueSymbol,
} from '@app/domain/interfaces/userWaitQueue.repository.interface';
import {
  QueueState,
  UserWaitQueueModel,
} from '@app/domain/models/userWaitQueue.model';
import { RedisSymbol } from '@app/infrastructure/redis.module';
import { EntityManager, DataSource } from 'typeorm';

@Injectable()
export class UserWaitQueueService {
  private readonly lockKey = 'user-wait-queue-lock';
  private readonly lockTimeout = 5000; // 5 seconds
  private readonly maxRetries = 5; // Maximum number of retries
  private readonly retryDelay = 1000; // Delay between retries in milliseconds

  constructor(
    @Inject(userWaitQueueSymbol)
    private readonly userWaitQueueRepository: UserWaitQueueRepository,
    @Inject(RedisSymbol)
    private readonly redis: Redis,
    private readonly dataSource: DataSource,
  ) {}

  private async acquireLock(): Promise<boolean> {
    const result = await this.redis.set(
      this.lockKey,
      'locked',
      'PX',
      this.lockTimeout,
      'NX',
    );
    return result === 'OK';
  }

  private async releaseLock(): Promise<void> {
    await this.redis.del(this.lockKey);
  }

  private async retryLockAcquire(retries: number): Promise<boolean> {
    while (retries > 0) {
      if (await this.acquireLock()) {
        return true;
      }
      retries--;
      await this.delay(this.retryDelay);
    }
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async setUserWaitQueue(userId: string): Promise<UserWaitQueueModel> {
    const lockAcquired = await this.retryLockAcquire(this.maxRetries);
    if (!lockAcquired) {
      throw new Error('Could not acquire lock after multiple retries');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newQueue = new UserWaitQueueModel();
      newQueue.userId = userId;
      newQueue.state = QueueState.WAITING;
      newQueue.createdAt = new Date();
      newQueue.expiredAt = new Date(
        newQueue.createdAt.getTime() + 60 * 60 * 1000,
      ); // Set expiry to 1 hour later

      const savedQueue = await this.userWaitQueueRepository.save(
        newQueue,
        queryRunner.manager,
      );
      await queryRunner.commitTransaction();
      await this.releaseLock();
      return savedQueue;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await this.releaseLock();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getUserWaitQueue(userId: string): Promise<UserWaitQueueModel> {
    return await this.userWaitQueueRepository.findByUserId(userId);
  }
}
