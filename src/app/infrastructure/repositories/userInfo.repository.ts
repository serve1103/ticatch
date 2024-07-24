import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoRepository } from '@app/domain/interfaces/userInfo.repsitory.interface';
import { UserInfoModel } from '@app/domain/models/userInfo.model';
import { UserInfo } from '@app/infrastructure/entities/userInfo.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '@app/infrastructure/mappers/userInfo.mapper.e2m';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserInfoRepositoryImpl implements UserInfoRepository {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
  ) {}

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
    return await this.userInfoRepository.findOne({ where: { token } });
  }

  async countAll(): Promise<number> {
    return await this.userInfoRepository.count();
  }
}
