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
import { DataSource } from 'typeorm';
import { RedisService } from '@app/infrastructure/redis.service';

@Injectable()
export class UserWaitQueueService {
  private readonly lockKey = 'user_queue_lock';
  private readonly lockTimeout = 5000; // 5 seconds

  constructor(private readonly redisService: RedisService) {}

  async setUserWaitQueue(userId: string): Promise<UserWaitQueueModel> {
    const createdAt = new Date();
    const userQueue = new UserWaitQueueModel(
      userId,
      QueueState.WAITING,
      createdAt,
    );
    await this.redisService.addWaitingUser(userQueue);
    return userQueue;
  }

  async getUserWaitQueue(userId: string): Promise<UserWaitQueueModel> {
    const users = await this.redisService.getWaitingUsers(-Infinity, Infinity);
    return users.find((u) => u.userId === userId);
  }

  async getUserWaitQueueList(): Promise<UserWaitQueueModel[]> {
    return await this.redisService.getWaitingUsers(-Infinity, Infinity);
  }

  async activateUsers(): Promise<void> {
    const currentTime = Date.now();

    let lockAcquired = await this.redisService.acquireLock(
      this.lockKey,
      this.lockTimeout,
    );
    while (!lockAcquired) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Retry every 100ms
      lockAcquired = await this.redisService.acquireLock(
        this.lockKey,
        this.lockTimeout,
      );
    }

    try {
      const waitingUsers = await this.redisService.getWaitingUsers(
        -Infinity,
        currentTime,
      );
      for (const userQueue of waitingUsers) {
        await this.redisService.removeWaitingUser(userQueue.userId);
        userQueue.state = QueueState.USING;
        userQueue.expiredAt = new Date(currentTime + 60 * 60 * 1000); // 1 hour expiry as Date object
        await this.redisService.addActiveUser(userQueue);
      }
    } finally {
      await this.redisService.releaseLock(this.lockKey);
    }
  }
}
