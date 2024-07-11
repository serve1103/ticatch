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

  async findAll(): Promise<UserInfoModel[]> {
    const userInfo = await this.userInfoRepository.find();
    return userInfo.map((user) => UserMapper.toDomain(user));
  }

  async findByUserId(userId: string): Promise<UserInfoModel> {
    const userInfo = await this.userInfoRepository.findOne({
      where: { userId },
    });

    if (!userInfo) {
      return null; // 여기서 null을 반환하여 이후 로직에서 처리할 수 있도록 함
    }

    return UserMapper.toDomain(userInfo);
  }

  async save(userInfo: UserInfoModel): Promise<UserInfoModel> {
    const userData = this.userInfoRepository.create(
      UserMapper.toEntity(userInfo),
    );
    const savedUserInfo = await this.userInfoRepository.save(userData);

    return UserMapper.toDomain(savedUserInfo);
  }

  async remove(userId: string): Promise<boolean> {
    if (await this.userInfoRepository.delete(userId)) return true;
    else return false;
  }
}
