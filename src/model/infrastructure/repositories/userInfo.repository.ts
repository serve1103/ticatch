import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoRepository } from '../../domain/interfaces/userInfo.repsitory.interface';
import { UserInfoModel } from '../../domain/models/userInfo.model';
import { UserInfo } from '../entities/userInfo.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '../mappers/userInfo.mapper.e2m';
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
    const userInfo = this.userInfoRepository.create({
      userId,
      token,
      position,
      estimatedWaitTime,
    });
    return await this.userInfoRepository.save(UserMapper.toEntity(userInfo));
  }

  async findByToken(token: string): Promise<UserInfoModel | undefined> {
    return await this.userInfoRepository.findOne({ where: { token } });
  }

  async countAll(): Promise<number> {
    return await this.userInfoRepository.count();
  }
}
