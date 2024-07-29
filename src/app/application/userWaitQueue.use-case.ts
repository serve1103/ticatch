import { UserWaitQueueModel } from '@app/domain/models/userWaitQueue.model';
import { UserWaitQueueService } from '@app/domain/services/userWaitQueue.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserWaitQueueUseCase {
  constructor(private readonly userWaitQueueService: UserWaitQueueService) {}

  async createUserWaitQueue(userId: string): Promise<UserWaitQueueModel> {
    return await this.userWaitQueueService.setUserWaitQueue(userId);
  }
}
