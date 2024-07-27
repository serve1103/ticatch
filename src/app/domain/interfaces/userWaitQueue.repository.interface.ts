import { EntityManager } from 'typeorm';
import { UserWaitQueueModel } from '@app/domain/models/userWaitQueue.model';

export const userWaitQueueSymbol = Symbol.for('UserWaitQueueRepository');

export interface UserWaitQueueRepository {
  save(
    userWaitQueue: UserWaitQueueModel,
    entityManager?: EntityManager,
  ): Promise<UserWaitQueueModel>;
  findByUserId(userId: string): Promise<UserWaitQueueModel>;
}
