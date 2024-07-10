import { UserInfoModel } from '../domain/models/userInfo.model';
import { UserInfoService } from '../domain/services/userInfo.service';

export class UserUseCase {
  constructor(private readonly userInfoService: UserInfoService) {}

  searchAll(): Promise<UserInfoModel[]> {
    return this.userInfoService.getUserInfoList();
  }

  searchByUser(userId: string): Promise<UserInfoModel> {
    return this.userInfoService.getUserInfo(userId);
  }

  executeByUser(userInfoModel: UserInfoModel): Promise<UserInfoModel> {
    return this.userInfoService.setUserInfo(userInfoModel);
  }

  truncateByUser(userId: string): Promise<boolean> {
    return this.userInfoService.delUserInfo(userId);
  }
}
