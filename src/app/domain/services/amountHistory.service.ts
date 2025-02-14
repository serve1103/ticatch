import { Inject, Injectable } from '@nestjs/common';
import {
  AmountHistoryModel,
  AmountHistoryState,
} from '@app/domain/models/amountHistory.model';
import { amountRepositorySymbol } from '@app/domain/interfaces/amount.repsitory.interface';
import { AmountHistoryRepository } from '@app/domain/interfaces/amountHistory.repository.interface';
import { AmountModel } from '@app/domain/models/amount.model';

@Injectable()
export class AmountHistoryService {
  constructor(
    @Inject(amountRepositorySymbol)
    private readonly amountHistoryRepository: AmountHistoryRepository,
  ) {}

  // 충전
  async setUserAmountHistory(
    amountModel: AmountModel,
    state: AmountHistoryState,
  ): Promise<AmountHistoryModel> {
    const amountHistory = new AmountHistoryModel(
      amountModel.userId,
      amountModel.userAmount,
      state,
    );

    const getAmountHistory =
      await this.amountHistoryRepository.save(amountHistory);

    return getAmountHistory;
  }

  // 충전 로그 전체 조회
  async getUserAmountHistory(userId: string): Promise<AmountHistoryModel[]> {
    const amountHistory =
      await this.amountHistoryRepository.findByUserId(userId);

    return amountHistory;
  }
}
