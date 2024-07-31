import { Injectable } from '@nestjs/common';
import { UserWaitQueueModel } from '@app/domain/models/userWaitQueue.model';
import { UserInfoService } from '@app/domain/services/userInfo.service';
import { UserWaitQueueService } from '@app/domain/services/userWaitQueue.service';

@Injectable()
export class UserWaitQueueUseCase {
  constructor(
    private readonly userWaitQueueService: UserWaitQueueService,
    private readonly userInfoService: UserInfoService,
  ) {}

  async addToQueue(userId: string): Promise<UserWaitQueueModel> {
    const verifiedUser = await this.userInfoService.findByUserId(userId);
    return await this.userWaitQueueService.setUserWaitQueue(
      verifiedUser.userId,
    );
  }

  async getQueueStatus(userId: string): Promise<UserWaitQueueModel> {
    return await this.userWaitQueueService.getUserWaitQueue(userId);
  }

  async getAllQueueStatus(): Promise<UserWaitQueueModel[]> {
    return await this.userWaitQueueService.getUserWaitQueueList();
  }

  async activateUsers(): Promise<void> {
    await this.userWaitQueueService.activateUsers();
  }
}
