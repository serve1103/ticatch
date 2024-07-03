import { Module } from '@nestjs/common';
import { UserInfoController } from './presentation/userInfo.controller';

@Module({
  controllers: [UserInfoController],
})
export class UserInfoModule {}
