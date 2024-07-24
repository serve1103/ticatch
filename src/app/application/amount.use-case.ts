import { AmountModel } from '@app/domain/models/amount.model';
import { AmountHistoryState } from '@app/domain/models/amountHistory.model';
import { AmountService } from '@app/domain/services/amount.service';
import { AmountHistoryService } from '@app/domain/services/amountHistory.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAmountUseCase {
  constructor(
    private readonly userAmountService: AmountService,
    private readonly amountHistoryService: AmountHistoryService,
  ) {}

  async chargeUserPoint(amountModel: AmountModel): Promise<AmountModel> {
    const userInfo = await this.userAmountService.setUserAmount(amountModel);
    // 충전 히스토리
    await this.amountHistoryService.setUserAmountHistory(
      amountModel,
      AmountHistoryState.CHARGE,
    );

    return userInfo;
  }

  async useUserPoint(amountModel: AmountModel): Promise<AmountModel> {
    const userInfo = await this.userAmountService.useUserAmount(amountModel);
    // 사용 히스토리
    await this.amountHistoryService.setUserAmountHistory(
      amountModel,
      AmountHistoryState.USE,
    );

    return userInfo;
  }

  async getUserPoint(userId: string): Promise<AmountModel> {
    const userAmount = await this.userAmountService.getUserAmount(userId);

    return userAmount;
  }
}
