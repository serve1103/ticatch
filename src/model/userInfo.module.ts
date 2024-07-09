import { Module } from '@nestjs/common';
import { UserInfoController } from './presentation/userInfo.controller';
import { UserInfoService } from './domain/userInfo.service';

@Module({
  controllers: [UserInfoController],
  providers: [UserInfoService],
})
export class UserInfoModule {}
