import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../presentation/auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('유저 로그인', () => {
    it('로그인 성공', async () => {
      const userId = 'test1';
      const userPw = '1';

      const result = controller.login({ userId, userPw });

      const token = '1q2w3e4r';

      expect(result).toEqual(token);
    });
    it('로그인 실패', async () => {});
  });
});
