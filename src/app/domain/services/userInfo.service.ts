import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserInfoRepository } from '@app/domain/interfaces/userInfo.repsitory.interface';

@Injectable()
export class UserInfoService {
  constructor(private readonly userInfoRepository: UserInfoRepository) {}

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
      return {
        position: userInfo.position,
        estimatedWaitTime: userInfo.estimatedWaitTime,
      };
    }
    return null;
  }
}
