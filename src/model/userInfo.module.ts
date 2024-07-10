import { Module } from '@nestjs/common';
import { UserInfoController } from './presentation/userInfo.controller';
import { UserInfoService } from './domain/services/userInfo.service';
import { UserUseCase } from './application/user.use-case';

@Module({
  controllers: [UserInfoController],
  providers: [UserInfoService, UserUseCase],
})
export class UserInfoModule {}
