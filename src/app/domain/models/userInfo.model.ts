export class UserInfoModel {
  constructor(
    public token: string,
    public userId: string,
    public position: number,
    public estimatedWaitTime: number,
    createdAt: Date,
  ) {}

  static create(userInfo: UserInfoModel): UserInfoModel {
    return userInfo;
  }
}
