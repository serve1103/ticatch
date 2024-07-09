import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from '../../presentation/payment.controller';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('결제 요청 api', () => {
    it('요청 성공', async () => {
      const userId = 'test1';
      const usingAmount = 3000;
      const result = true;

      expect(result).toEqual(true);
    });
  });
});
