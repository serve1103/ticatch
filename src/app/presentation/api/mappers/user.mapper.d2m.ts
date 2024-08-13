import { UserInfoModel } from '@app/domain/models/userInfo.model';
import { UserResponseDto } from '@app/presentation/api/dto/user.response.dto';
import {
  UpdateUserRequest,
  UserIdRequest,
  UserInfoRequestDto,
} from '@app/presentation/api/dto/user.request.dto';

export class UserMapper {
  static toRequest(domain: UserInfoModel): UserInfoRequestDto {
    return new UserInfoRequestDto(
      domain.userId,
      domain.userName,
      domain.createdAt,
    );
  }
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
