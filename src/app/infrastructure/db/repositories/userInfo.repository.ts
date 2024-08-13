import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoRepository } from '@app/domain/interfaces/userInfo.repsitory.interface';
import { UserInfoModel } from '@app/domain/models/userInfo.model';
import { UserInfo } from '@app/infrastructure/db/entities/userInfo.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '@app/infrastructure/db/mappers/userInfo.mapper.e2m';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserInfoRepositoryImpl implements UserInfoRepository {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
  ) {}

  async findByUserId(userId: string): Promise<UserInfoModel> {
    return await this.userInfoRepository.findOne({ where: { userId } });
  }

  async setUserInfo(userInfo: UserInfoModel): Promise<UserInfoModel> {
    const verifiedUser = await this.userInfoRepository.findOne({
      where: { userId: userInfo.userId },
    });

    if (verifiedUser) throw new Error('이미 등록된 유저 입니다.');

    const savedUser = await this.userInfoRepository.save(userInfo);
    return savedUser;
  }

  async createToken(
    userId: string,
    token: string,
    position: number,
    estimatedWaitTime: number,
  ): Promise<UserInfoModel> {
    // const userInfo = this.userInfoRepository.create({
    //   userId,
    //   token,
    //   position,
    //   estimatedWaitTime,
    // });
    // return await this.userInfoRepository.save(UserMapper.toEntity(userInfo));
    return;
  }

  async findByToken(token: string): Promise<UserInfoModel | undefined> {
    // return await this.userInfoRepository.findOne({ where: { token } });
    return;
  }

  async countAll(): Promise<number> {
    return await this.userInfoRepository.count();
  }
}
