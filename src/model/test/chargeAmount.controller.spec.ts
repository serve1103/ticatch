import { Test, TestingModule } from '@nestjs/testing';
import { ChargeAmountController } from '../presentation/chargeAmount.controller';

describe('ChargeAmountController', () => {
  let controller: ChargeAmountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChargeAmountController],
    }).compile();

    controller = module.get<ChargeAmountController>(ChargeAmountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('금액 충전 관련 테스트', () => {
    const userId = 'test';
    it('충전 성공', async () => {
      const userAmount = 10000;
      const chargeAmount = 5000;

      const userChargeAmount = userAmount + chargeAmount;

      const result = await controller.setChargeAmount({ userId, chargeAmount });

      expect(result).toEqual({ userId, userChargeAmount });
    });

    it('충전 실패 - 금액 입력을 하지 않음', async () => {
      const chargeAmount = null;

      await expect(
        controller.setChargeAmount({ userId, chargeAmount }),
      ).rejects.toThrow('금액을 입력해주세요.');
    });

    it('충전 실패 - 0원 충전', async () => {
      const chargeAmount = 0;

      await expect(
        controller.setChargeAmount({ userId, chargeAmount }),
      ).rejects.toThrow('0원은 충전할 수 없습니다.');
    });
  });

  describe('금액 조회 관련 테스트', () => {
    it('조회 성공', async () => {
      const userId = 'test1';
      const userAmount = 10000;

      const result = await controller.getChargeAmount({ userId });

      expect(result).toEqual({ userId, userAmount });
    });

    it('조회 실패 - 올바르지 않은 아이디', async () => {
      const userId = null;

      await expect(controller.getChargeAmount({ userId })).rejects.toThrow(
        '유저를 찾을 수 없습니다.',
      );
    });
  });

  describe('금액 사용 관련 테스트', () => {
    it('사용 성공', async () => {
      const userId = 'test1';
      const userAmount = 10000;
      const usingAmount = 5000;

      const usedAmount = userAmount - usingAmount;

      const result = await controller.useChargeAmount({ userId, usingAmount });

      expect(result).toEqual({ userId, usedAmount });
    });

    it('사용 실패 - 올바르지 않은 아이디', async () => {
      const userId = null;
      const usingAmount = 5000;

      await expect(
        controller.useChargeAmount({ userId, usingAmount }),
      ).rejects.toThrow('유저를 찾을 수 없습니다.');
    });

    it('사용 실패 - 입력되지 않은 금액', async () => {
      const userId = 'test1';
      const usingAmount = null;

      await expect(
        controller.useChargeAmount({ userId, usingAmount }),
      ).rejects.toThrow('사용 금액을 입력해주세요.');
    });

    it('사용 실패 - 보유 금액보다 많은 금액 사용', async () => {
      const userId = 'test1';
      const usingAmount = 100000;

      await expect(
        controller.useChargeAmount({ userId, usingAmount }),
      ).rejects.toThrow('사용금액은 보유금액보다 클 수 없습니다.');
    });

    it('사용 실패 - 음수의 금액을 사용', async () => {
      const userId = 'test1';
      const usingAmount = -100000;

      await expect(
        controller.useChargeAmount({ userId, usingAmount }),
      ).rejects.toThrow('음수는 사용할 수 없습니다.');
    });
  });
});
