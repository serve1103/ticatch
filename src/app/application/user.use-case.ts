import { Injectable } from '@nestjs/common';
import { UserInfoService } from '@app/domain/services/userInfo.service';
import {
  UpdateUserRequest,
  UserIdRequest,
} from '@app/presentation/dto/user.request.dto';
import { UserResponseDto } from '@app/presentation/dto/user.response.dto';
import { UserMapper } from '@app/presentation/mappers/user.mapper.d2m';
import { UserInfoModel } from '@app/domain/models/userInfo.model';

@Injectable()
export class UserUseCase {
  constructor(private readonly userInfoService: UserInfoService) {}

  async executeByUser(userInfo: UserInfoModel): Promise<UserInfoModel> {
    const savedUser = await this.userInfoService.setUser(userInfo);
    return savedUser;
  }

  // async searchAll(): Promise<UserResponseDto[]> {
  //   const users = await this.userInfoService.getUserInfoList();
  //   return users.map((user) => UserMapper.toResponseDto(user));
  // }

  // async searchByUser(userIdRequest: UserIdRequest): Promise<UserResponseDto> {
  //   const user = await this.userInfoService.getUserInfo(userIdRequest.userId);
  //   return UserMapper.toResponseDto(user);
  // }

  // async executeByUser(
  //   userInfoRequest: UserInfoRequest,
  // ): Promise<UserResponseDto> {
  //   const userInfoModel = UserMapper.toModel(userInfoRequest);
  //   const user = await this.userInfoService.setUserInfo(userInfoModel);
  //   return UserMapper.toResponseDto(user);
  // }

  // async updateUser(
  //   updateUserRequest: UpdateUserRequest,
  // ): Promise<UserResponseDto> {
  //   const userInfoModel = UserMapper.toUpdateModel(updateUserRequest);
  //   const updatedUser = await this.userInfoService.setUserInfo(userInfoModel);
  //   return UserMapper.toResponseDto(updatedUser);
  // }

  // async truncateByUser(userIdRequest: UserIdRequest): Promise<boolean> {
  //   return await this.userInfoService.delUserInfo(userIdRequest.userId);
  // }
}
