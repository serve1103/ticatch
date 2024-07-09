import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('유저 관리')
@Controller('userInfo')
export class UserInfoController {
  constructor() {}

  // 특정 유저 정보 조회
  @ApiOperation({ summary: '유저 조회' })
  @Post('/getUserInfo')
  async getUserInfo(userId: string): Promise<object> {
    // 유저 아이디가 없을 때
    if (!userId) throw new Error('유저를 찾을 수 없습니다.');

    const userName = '테스트';
    const userEmail = 'test@test.com';
    const token = '1q2w3e4r';

    return {
      userId,
      userName,
      userEmail,
      token,
    };
  }

  // 유저 등록
  @ApiOperation({ summary: '유저 등록' })
  @Post('/setUserInfo')
  async setUserInfo(
    userId: string,
    userPw: string,
    userName: string,
  ): Promise<object> {
    // 아이디 입력을 안했을 때
    if (!userId) throw new Error('아이디를 입력해주세요.');
    // 비밀번호 입력을 안했을 때
    if (!userPw) throw new Error('비밀번호를 입력해주세요.');
    // 유저 이름 입력을 안했을 때
    if (!userName) throw new Error('이름을 입력해주세요.');

    return {
      userId,
      userPw,
      userName,
    };
  }

  // 유저 정보 수정
  @ApiOperation({ summary: '유저 정보 수정' })
  @Post('/updateUserInfo')
  async updateUserInfo(userId: string, userName: string): Promise<object> {
    // 유저 아이디가 없을 때
    if (!userId) throw new Error('유저를 찾을 수 없습니다.');
    // 유저 이름 입력을 안했을 때
    if (!userName) throw new Error('이름을 입력해주세요.');

    return {
      userId,
      userName,
    };
  }

  // 유저 삭제
  @ApiOperation({ summary: '유저 삭제' })
  @Post('/delUserInfo')
  async delUserInfo(userId: string): Promise<boolean> {
    if (!userId) throw new Error('유저를 찾을 수 없습니다.');

    return true;
  }
}
