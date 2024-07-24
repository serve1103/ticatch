import { EntityManager } from 'typeorm';
import { UserWaitQueueModel } from '../models/userWaitQueue.model';

export interface UserWaitQueueRepository {
  save(
    userWaitQueue: UserWaitQueueModel,
    entityManager: EntityManager,
  ): Promise<UserWaitQueueModel>;
  findByUserId(userId: string): Promise<UserWaitQueueModel>;
}
