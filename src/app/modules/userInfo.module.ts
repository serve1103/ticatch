import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoController } from '@app/presentation/api/userInfo.controller';
import { UserUseCase } from '@app/application/user.use-case';
import { UserInfoService } from '@app/domain/services/userInfo.service';
import { UserInfoRepositoryImpl } from '@app/infrastructure/repositories/userInfo.repository';
import { UserInfo } from '@app/infrastructure/entities/userInfo.entity';
import { userInfoRepositorySymbol } from '@app/domain/interfaces/userInfo.repsitory.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  controllers: [UserInfoController],
  providers: [
    UserInfoService,
    UserUseCase,
    UserInfoModule,
    {
      provide: userInfoRepositorySymbol,
      useClass: UserInfoRepositoryImpl,
    },
  ],
  exports: [UserInfoService, UserUseCase, userInfoRepositorySymbol],
})
export class UserInfoModule {}
