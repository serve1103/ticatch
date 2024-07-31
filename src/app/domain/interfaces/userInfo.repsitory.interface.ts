import { UserInfoModel } from '@app/domain/models/userInfo.model';

export const userInfoRepositorySymbol = Symbol.for('UserInfoRepository');

export interface UserInfoRepository {
  createToken(
    userId: string,
    token: string,
    position: number,
    estimatedWaitTime: number,
  ): Promise<UserInfoModel>;
  findByToken(token: string): Promise<UserInfoModel | undefined>;
  countAll(): Promise<number>;
  findByUserId(userId: string): Promise<UserInfoModel>;
  setUserInfo(userInfo: UserInfoModel): Promise<UserInfoModel>;
}
