import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserUseCase } from '../application/user.use-case';
import {
  UpdateUserRequest,
  UserIdRequest,
  UserInfoRequest,
} from '@app/presentation/dtos/request/user.request.dto';
import { UserResponseDto } from '@app/presentation/dtos/response/user.response.dto';

@ApiTags('유저 관리')
@Controller('userInfo')
export class UserInfoController {
  constructor(private readonly userUseCase: UserUseCase) {}

  // 특정 유저 정보 조회
  @ApiOperation({ summary: '유저 조회' })
  @Post('/getUserInfo')
  async getUserInfo(
    @Body() userIdRequest: UserIdRequest,
  ): Promise<UserResponseDto> {
    return await this.userUseCase.searchByUser(userIdRequest);
  }

  // 유저 등록
  @ApiOperation({ summary: '유저 등록' })
  @Post('/setUserInfo')
  async setUserInfo(
    @Body() userInfoRequest: UserInfoRequest,
  ): Promise<UserResponseDto> {
    return await this.userUseCase.executeByUser(userInfoRequest);
  }

  // 유저 정보 수정
  @ApiOperation({ summary: '유저 정보 수정' })
  @Post('/updateUserInfo')
  async updateUserInfo(
    @Body() updateUserRequest: UpdateUserRequest,
  ): Promise<UserResponseDto> {
    return await this.userUseCase.updateUser(updateUserRequest);
  }

  // 유저 삭제
  @ApiOperation({ summary: '유저 삭제' })
  @Post('/delUserInfo')
  async delUserInfo(@Body() userIdRequest: UserIdRequest): Promise<boolean> {
    return await this.userUseCase.truncateByUser(userIdRequest);
  }
}
