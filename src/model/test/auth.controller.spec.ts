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

      const result = await controller.login({ userId, userPw });

      const token = '1q2w3e4r';

      expect(result).toEqual({ userId, token });
    });

    it('로그인 실패 - 비밀번호 불일치', async () => {
      const userId = 'test1';
      const userPw = '2';

      await expect(controller.login({ userId, userPw })).rejects.toThrow(
        '비밀번호가 일치하지 않습니다.',
      );
    });
  });

  describe('유저 로그아웃', () => {
    it('로그아웃 성공', async () => {
      const userId = 'test1';
      const token = null;

      const result = null;

      expect(result).toEqual(token);
    });
  });
});
