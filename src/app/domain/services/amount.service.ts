import { Inject, Injectable } from '@nestjs/common';
import {
  AmountRepository,
  amountRepositorySymbol,
} from '@app/domain/interfaces/amount.repsitory.interface';
import { AmountModel } from '@app/domain/models/amount.model';
import { EntityManager } from 'typeorm';

@Injectable()
export class AmountService {
  constructor(
    @Inject(amountRepositorySymbol)
    private readonly amountRepository: AmountRepository,
  ) {}

  // 유저 금액 조회
  async getUserAmount(amountModel: AmountModel) {
    const userInfo = await this.amountRepository.findByUserId(
      amountModel.userId,
    );

    if (!userInfo) throw new Error('존재하지 않는 유저입니다.');

    return userInfo;
  }

  // 포인트 충전
  async setUserAmount(amountModel: AmountModel, entityManager?: EntityManager) {
    const userInfo = await this.amountRepository.findByUserId(
      amountModel.userId,
    );

    if (!userInfo) throw new Error('존재하지 않는 유저입니다.');

    try {
      userInfo.userAmount += amountModel.userAmount;
      return await this.amountRepository.save(userInfo, entityManager);
    } catch (e) {
      throw e;
    }
  }

  // 포인트 사용
  async useUserAmount(amountModel: AmountModel, entityManager?: EntityManager) {
    const userInfo = await this.amountRepository.findByUserId(
      amountModel.userId,
    );

    if (!userInfo) throw new Error('존재하지 않는 유저입니다.');

    try {
      userInfo.userAmount -= amountModel.userAmount;
      return await this.amountRepository.save(userInfo, entityManager);
    } catch (e) {
      throw e;
    }
  }
}
