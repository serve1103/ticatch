import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoService } from '@app/domain/services/userInfo.service';

describe('UserInfoService', () => {
  let service: UserInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInfoService],
    }).compile();

    service = module.get<UserInfoService>(UserInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
