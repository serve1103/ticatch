import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoController } from '../presentation/controllers/userInfo.controller';

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
});
