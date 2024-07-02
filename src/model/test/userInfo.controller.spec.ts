import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoController } from '../presentation/controllers/userInfo.controller';
import { MockUserInfoService } from '../application/mockservices/mockuserInfo.service';

describe('UserInfoController', () => {
  let controller: UserInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInfoController],
      providers: [MockUserInfoService],
    }).compile();

    controller = module.get<UserInfoController>(UserInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('로그인 확인', () => {
    it('로그인 성공', async () => {
      const userId = 'test1';
      const userPw = '1';
      const userName = '테스트';

      const result = await controller.login({ userId, userPw });

      expect(result).toEqual({ userId, userName });
    });

    it('로그인 실패 - 비밀번호 미 기재', async () => {
      const userId = 'test1';
      const userPw = '';

      await expect(controller.login({ userId, userPw })).rejects.toThrow(
        '비밀번호를 입력해주세요.',
      );
    });

    it('로그인 실패 - 유효하지 않은 아이다', async () => {
      const userId = 'test2';
      const userPw = '1';

      await expect(controller.login({ userId, userPw })).rejects.toThrow(
        '유효하지 않은 아이디입니다.',
      );
    });
  });
});
