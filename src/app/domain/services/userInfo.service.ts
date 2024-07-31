import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  UserInfoRepository,
  userInfoRepositorySymbol,
} from '@app/domain/interfaces/userInfo.repsitory.interface';
import { UserInfoModel } from '@app/domain/models/userInfo.model';

@Injectable()
export class UserInfoService {
  constructor(
    @Inject(userInfoRepositorySymbol)
    private readonly userInfoRepository: UserInfoRepository,
  ) {}

  async findByUserId(userId: string): Promise<UserInfoModel> {
    const userInfo = await this.userInfoRepository.findByUserId(userId);

    if (!userInfo) throw new Error('유저를 찾을 수 없습니다.');

    return userInfo;
  }

  async setUser(userInfo: UserInfoModel): Promise<UserInfoModel> {
    const savedUser = await this.userInfoRepository.setUserInfo(userInfo);
    return savedUser;
  }

  async issueToken(userId: string): Promise<string> {
    const token = uuidv4();
    const position = (await this.userInfoRepository.countAll()) + 1;
    const estimatedWaitTime = position * 5; // 5분 단위 대기 시간 예측

    await this.userInfoRepository.createToken(
      userId,
      token,
      position,
      estimatedWaitTime,
    );

    return token;
  }

  async getTokenInfo(
    token: string,
  ): Promise<{ position: number; estimatedWaitTime: number } | null> {
    const userInfo = await this.userInfoRepository.findByToken(token);
    if (userInfo) {
      return null;
    }
    return null;
  }
}
