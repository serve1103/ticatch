import { Module } from '@nestjs/common';
import { UserInfoController } from './presentation/controllers/userInfo.controller';
import { UserInfoService } from './domain/services/userInfo.service';

@Module({
  controllers: [UserInfoController],
  providers: [UserInfoService]
})
export class UserInfoModule {}
