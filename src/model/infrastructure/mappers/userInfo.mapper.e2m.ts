import { UserInfoModel } from '../../domain/models/userInfo.model';
import { UserInfo } from '../entities/userInfo.entity';

export class UserMapper {
  static toDomain(entity: UserInfo): UserInfoModel {
    return new UserInfoModel(
      entity.userId,
      entity.userPw,
      entity.userName,
      entity.userEmail,
    );
  }

  static toEntity(domain: UserInfoModel): UserInfo {
    const entity = new UserInfo();

    entity.userId = domain.id;
    entity.userPw = domain.password;
    entity.userName = domain.name;
    entity.userEmail = domain.email;

    return entity;
  }
}
