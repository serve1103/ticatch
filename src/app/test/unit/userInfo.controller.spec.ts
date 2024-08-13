import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoController } from '../../presentation/api/userInfo.controller';

describe('UserInfoController', () => {
  let controller: UserInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInfoController],
    }).compile();

    controller = module.get<UserInfoController>(UserInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('특정 유저 조회', () => {
    it('조회 성공', async () => {
      const userId = 'test1';
      const userName = '테스트';
      const userEmail = 'test@test.com';
      const token = '1q2w3e4r';

      const result = await controller.getUserInfo(userId);

      expect(result).toEqual({ userId, userName, userEmail, token });
    });

    it('조회 실패 - 아이디 없음', async () => {
      const userId = null;
      const userPw = '테스트';

      await expect(controller.getUserInfo(userId)).rejects.toThrow(
        '유저를 찾을 수 없습니다.',
      );
    });
  });

  describe('유저 등록', () => {
    it('등록 성공', async () => {
      const userId = 'test1';
      const userPw = '1';
      const userName = '테스트';

      const result = await controller.setUserInfo(userId, userPw, userName);

      expect(result).toEqual({ userId, userPw, userName });
    });

    it('등록 실패 - 아이디 없음', async () => {
      const userId = null;
      const userPw = '1';
      const userName = '테스트';

      await expect(
        controller.setUserInfo(userId, userPw, userName),
      ).rejects.toThrow('아이디를 입력해주세요.');
    });

    it('등록 실패 - 비번 없음', async () => {
      const userId = 'test1';
      const userPw = null;
      const userName = '테스트';

      await expect(
        controller.setUserInfo(userId, userPw, userName),
      ).rejects.toThrow('비밀번호를 입력해주세요.');
    });

    it('등록 실패 - 아이디 없음', async () => {
      const userId = 'tes1';
      const userPw = '1';
      const userName = null;

      await expect(
        controller.setUserInfo(userId, userPw, userName),
      ).rejects.toThrow('이름을 입력해주세요.');
    });
  });

  describe('유저 정보 변경', () => {
    it('변경 성공', async () => {
      const userId = 'test1';
      const userName = '테스트';

      const result = await controller.updateUserInfo(userId, userName);

      expect(result).toEqual({ userId, userName });
    });

    it('변경 실패 - 아이디를 찾을 수 없음', async () => {
      const userId = null;
      const userName = '테스트1';

      await expect(controller.updateUserInfo(userId, userName)).rejects.toThrow(
        '유저를 찾을 수 없습니다.',
      );
    });

    it('변경 실패 - 이름 미기입', async () => {
      const userId = 'test1';
      const userName = null;

      await expect(controller.updateUserInfo(userId, userName)).rejects.toThrow(
        '이름을 입력해주세요.',
      );
    });
  });

  describe('유저 삭제', () => {
    it('삭제 성공', async () => {
      const userId = 'test1';

      const result = await controller.delUserInfo(userId);

      expect(result).toEqual(true);
    });

    it('삭제 실패 - 유저를 찾을 수 없습니다.', async () => {
      const userId = null;

      await expect(controller.delUserInfo(userId)).rejects.toThrow(
        '유저를 찾을 수 없습니다.',
      );
    });
  });
});
