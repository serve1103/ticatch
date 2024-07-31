import { Inject, Injectable } from '@nestjs/common';
import { RedisSymbol } from './redis.module';
import { Redis } from 'ioredis';
import { UserWaitQueueModel } from '@app/domain/models/userWaitQueue.model';

@Injectable()
export class RedisService {
  constructor(@Inject(RedisSymbol) private readonly redis: Redis) {}

  async addWaitingUser(userQueue: UserWaitQueueModel): Promise<void> {
    const score = userQueue.createdAt.getTime(); // Convert Date to timestamp
    const member = JSON.stringify(userQueue);
    await this.redis.zadd('waiting_users', score, member);
  }

  async getWaitingUsers(
    min: number,
    max: number,
  ): Promise<UserWaitQueueModel[]> {
    const result = await this.redis.zrangebyscore('waiting_users', min, max);
    return result.map((item) => JSON.parse(item));
  }

  async removeWaitingUser(userId: string): Promise<void> {
    const allUsers = await this.redis.zrange('waiting_users', 0, -1);
    for (const item of allUsers) {
      const parsedItem = JSON.parse(item);
      if (parsedItem.userId === userId) {
        await this.redis.zrem('waiting_users', item);
        break;
      }
    }
  }

  async addActiveUser(userQueue: UserWaitQueueModel): Promise<void> {
    await this.redis.sadd('active_users', JSON.stringify(userQueue));
  }

  async isActiveUser(userId: string): Promise<boolean> {
    const allUsers = await this.redis.smembers('active_users');
    for (const item of allUsers) {
      const parsedItem = JSON.parse(item);
      if (parsedItem.userId === userId) {
        return true;
      }
    }
    return false;
  }

  async removeActiveUser(userId: string): Promise<void> {
    const allUsers = await this.redis.smembers('active_users');
    for (const item of allUsers) {
      const parsedItem = JSON.parse(item);
      if (parsedItem.userId === userId) {
        await this.redis.srem('active_users', item);
        break;
      }
    }
  }

  async getActiveUsers(): Promise<UserWaitQueueModel[]> {
    const result = await this.redis.smembers('active_users');
    return result.map((item) => JSON.parse(item));
  }

  async removeExpiredActiveUsers(currentTime: number): Promise<void> {
    const activeUsers = await this.getActiveUsers();
    for (const { userId, expiredAt } of activeUsers) {
      if (expiredAt && new Date(expiredAt).getTime() <= currentTime) {
        await this.removeActiveUser(userId);
      }
    }
  }

  async acquireLock(lockKey: string, lockTimeout: number): Promise<boolean> {
    const result = await this.redis.set(
      lockKey,
      'locked',
      'PX',
      lockTimeout,
      'NX',
    );
    return result === 'OK';
  }

  async releaseLock(lockKey: string): Promise<void> {
    await this.redis.del(lockKey);
  }

  async getQueuePosition(userQueue: UserWaitQueueModel): Promise<number> {
    return await this.redis.zrank('waiting_users', JSON.stringify(userQueue));
  }

  getClient(): Redis {
    return this.redis;
  }
}
