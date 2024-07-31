export class UserInfoModel {
  constructor(
    public userId: string,
    public userName: string,
    public createdAt: Date,
    public idx?: number,
  ) {}

  static create(userInfo: UserInfoModel): UserInfoModel {
    return userInfo;
  }
}
