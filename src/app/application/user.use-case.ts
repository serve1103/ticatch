import { Injectable } from '@nestjs/common';
import { UserInfoService } from '@app/domain/services/userInfo.service';
import {
  UpdateUserRequest,
  UserIdRequest,
  UserInfoRequest,
} from '@app/presentation/dtos/request/user.request.dto';
import { UserResponseDto } from '@app/presentation/dtos/response/user.response.dto';
import { UserMapper } from '@app/presentation/mappers/user.mapper.d2m';

@Injectable()
export class UserUseCase {
  constructor(private readonly userInfoService: UserInfoService) {}

  async searchAll(): Promise<UserResponseDto[]> {
    const users = await this.userInfoService.getUserInfoList();
    return users.map((user) => UserMapper.toResponseDto(user));
  }

  async searchByUser(userIdRequest: UserIdRequest): Promise<UserResponseDto> {
    const user = await this.userInfoService.getUserInfo(userIdRequest.userId);
    return UserMapper.toResponseDto(user);
  }

  async executeByUser(
    userInfoRequest: UserInfoRequest,
  ): Promise<UserResponseDto> {
    const userInfoModel = UserMapper.toModel(userInfoRequest);
    const user = await this.userInfoService.setUserInfo(userInfoModel);
    return UserMapper.toResponseDto(user);
  }

  async updateUser(
    updateUserRequest: UpdateUserRequest,
  ): Promise<UserResponseDto> {
    const userInfoModel = UserMapper.toUpdateModel(updateUserRequest);
    const updatedUser = await this.userInfoService.setUserInfo(userInfoModel);
    return UserMapper.toResponseDto(updatedUser);
  }

  async truncateByUser(userIdRequest: UserIdRequest): Promise<boolean> {
    return await this.userInfoService.delUserInfo(userIdRequest.userId);
  }
}
