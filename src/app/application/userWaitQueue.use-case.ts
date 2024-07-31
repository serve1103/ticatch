import { UserWaitQueueModel } from '@app/domain/models/userWaitQueue.model';
import { UserInfoService } from '@app/domain/services/userInfo.service';
import { UserWaitQueueService } from '@app/domain/services/userWaitQueue.service';
import { Injectable } from '@nestjs/common';

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

  async getQueueStatus(userId: string) {
    return this.userWaitQueueService.getUserWaitQueue(userId);
  }

  async getAllQueueStatus() {
    return this.userWaitQueueService.getUserWaitQueueList();
  }
}
