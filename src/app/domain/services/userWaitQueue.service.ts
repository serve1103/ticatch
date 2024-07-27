import { Inject, Injectable } from '@nestjs/common';
import {
  UserWaitQueueRepository,
  userWaitQueueSymbol,
} from '@app/domain/interfaces/userWaitQueue.repository.interface';
import {
  QueueState,
  UserWaitQueueModel,
} from '@app/domain/models/userWaitQueue.model';

@Injectable()
export class UserWaitQueueService {
  constructor(
    @Inject(userWaitQueueSymbol)
    private readonly userWaitQueueRepository: UserWaitQueueRepository,
  ) {}

  async setUserWaitQueue(userId: string): Promise<UserWaitQueueModel> {
    const newQueue = new UserWaitQueueModel();
    newQueue.userId = userId;
    newQueue.state = QueueState.WAITING;

    return await this.userWaitQueueRepository.save(newQueue);
  }

  async getUserWaitQueue(userId: string): Promise<UserWaitQueueModel> {
    const userQueue = await this.userWaitQueueRepository.findByUserId(userId);
    return userQueue;
  }
}
