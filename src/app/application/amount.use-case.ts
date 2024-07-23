import { AmountModel } from '@app/domain/models/amount.model';
import { AmountService } from '@app/domain/services/amount.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAmountUseCase {
  constructor(private userAmountService: AmountService) {}

  async chargeUserPoint(amountModel: AmountModel): Promise<AmountModel> {
    const userInfo = await this.userAmountService.setUserAmount(amountModel);
    return userInfo;
  }

  async useUserPoint(amountModel: AmountModel): Promise<AmountModel> {
    const userInfo = await this.userAmountService.useUserAmount(amountModel);
    return userInfo;
  }
}
