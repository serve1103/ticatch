export class UserInfoModel {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password?: string,
  ) {}

  static create(userInfo: UserInfoModel): UserInfoModel {
    return userInfo;
  }
}
