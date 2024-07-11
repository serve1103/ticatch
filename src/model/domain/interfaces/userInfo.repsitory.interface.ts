import { UserInfoModel } from '../models/userInfo.model';

export const userInfoRepositorySymbol = Symbol.for('UserInfoRepository');

export interface UserInfoRepository {
  findAll(): Promise<UserInfoModel[]>;
  findByUserId(userId: string): Promise<UserInfoModel>;
  save(userInfo: UserInfoModel): Promise<UserInfoModel>;
  remove(userId: string): Promise<boolean>;
}
