import { UserWaitQueueModel } from '@app/domain/models/userWaitQueue.model';
import { UserWaitQueueService } from '@app/domain/services/userWaitQueue.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserWaitQueueUseCase {
  constructor(private readonly userWaitQueueService: UserWaitQueueService) {}

  async addToQueue(userId: string): Promise<UserWaitQueueModel> {
    return await this.userWaitQueueService.setUserWaitQueue(userId);
  }

  async getQueueStatus(userId: string) {
    return this.userWaitQueueService.getUserWaitQueue(userId);
  }

  async getAllQueueStatus() {
    return this.userWaitQueueService.getUserWaitQueueList();
  }
}
