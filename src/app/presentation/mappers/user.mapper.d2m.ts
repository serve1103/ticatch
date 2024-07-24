import { UserInfoModel } from '@app/domain/models/userInfo.model';
import { UserResponseDto } from '@app/presentation/dto/user.response.dto';
import {
  UpdateUserRequest,
  UserIdRequest,
  UserInfoRequest,
} from '@app/presentation/dto/user.request.dto';

export class UserMapper {
  // static toResponseDto(domain: UserInfoModel): UserResponseDto {
  //   return new UserResponseDto(domain.id, domain.name, domain.email);
  // }
  // static toModel(dto: UserInfoRequest): UserInfoModel {
  //   return new UserInfoModel(
  //     dto.userId,
  //     dto.userPw,
  //     dto.userName,
  //     dto.userEmail,
  //   );
  // }
  // static toUpdateModel(dto: UpdateUserRequest): UserInfoModel {
  //   return new UserInfoModel(dto.userId, dto.userName, dto.userEmail);
  // }
  // static toUserIdModel(dto: UserIdRequest): UserInfoModel {
  //   return new UserInfoModel(dto.userId, '', '', '');
  // }
}
