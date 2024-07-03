import { Controller, Post } from '@nestjs/common';

@Controller('chargeAmount')
export class ChargeAmountController {
  // 금액 충전
  @Post('/setChargeAmount')
  async setChargeAmount({ userId, chargeAmount }): Promise<object> {
    const userAmount = 10000;

    if (chargeAmount === null || chargeAmount === undefined)
      throw new Error('금액을 입력해주세요.');

    if (chargeAmount == 0) throw new Error('0원은 충전할 수 없습니다.');

    const userChargeAmount = userAmount + chargeAmount;

    return { userId, userChargeAmount };
  }

  // 금액 조회
  @Post('/getChargeAmount')
  async getChargeAmount({ userId }): Promise<object> {
    const userAmount = 10000;

    if (!userId) throw new Error('유저를 찾을 수 없습니다.');

    return { userId, userAmount };
  }

  // 금액 조회
  @Post('/useChargeAmount')
  async useChargeAmount({ userId, usingAmount }): Promise<object> {
    const userAmount = 10000;

    if (!userId) throw new Error('유저를 찾을 수 없습니다.');

    if (usingAmount < 0) throw new Error('음수는 사용할 수 없습니다.');

    if (usingAmount === null || usingAmount === undefined)
      throw new Error('사용 금액을 입력해주세요.');

    if (userAmount < usingAmount)
      throw new Error('사용금액은 보유금액보다 클 수 없습니다.');

    const usedAmount = userAmount - usingAmount;

    return { userId, usedAmount };
  }
}
