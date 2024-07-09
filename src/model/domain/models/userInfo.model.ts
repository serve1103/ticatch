export class UserInfoModel {
  constructor(
    public id: string,
    public password: string,
    public name: string,
    public email: string,
  ) {}

  static create(userInfo: UserInfoModel): UserInfoModel {
    return userInfo;
  }
}
