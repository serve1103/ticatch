import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoController } from './presentation/userInfo.controller';
import { UserUseCase } from './application/user.use-case';
import { UserInfoService } from './domain/services/userInfo.service';
import { UserInfoRepositoryImpl } from './infrastructure/repositories/userInfo.repository';
import { UserInfo } from './infrastructure/entities/userInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  controllers: [UserInfoController],
  providers: [
    UserInfoService,
    UserUseCase,
    {
      provide: 'UserInfoRepository',
      useClass: UserInfoRepositoryImpl,
    },
  ],
  exports: [UserInfoService, UserUseCase, 'UserInfoRepository'],
})
export class UserInfoModule {}
