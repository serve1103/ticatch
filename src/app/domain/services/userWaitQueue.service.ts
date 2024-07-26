import { Inject, Injectable } from '@nestjs/common';
import {
  UserWaitQueueRepository,
  userWaitQueueSymbol,
} from '@app/domain/interfaces/userWaitQueue.repository.interface';
import { UserWaitQueueModel } from '../models/userWaitQueue.model';

@Injectable()
export class UserWaitQueueService {
  constructor(
    @Inject(userWaitQueueSymbol)
    private readonly userWaitQueueRepository: UserWaitQueueRepository,
  ) {}

  async setUserWaitQueue(
    userWaitQueue: UserWaitQueueModel,
  ): Promise<UserWaitQueueModel> {
    return;
  }

  async getUserWaitQueue(userId: string): Promise<UserWaitQueueModel> {
    return;
  }
}
