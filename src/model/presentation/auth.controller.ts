import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('인증관리')
export class AuthController {
  constructor() {}

  private userWaitQueue: { idx: number; userId: string; state: string }[] = [];
  private currentIdx: number = 1;

  @ApiOperation({ summary: '로그인' })
  @Post('/login')
  async login({ userId, userPw }): Promise<object> {
    const token = '1q2w3e4r';

    if (userPw !== '1') throw new Error('비밀번호가 일치하지 않습니다.');

    const userData = { userId, token };

    return userData;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('/logout')
  async logout(userId: string): Promise<string> {
    let token = '1q2w3e4r';

    if (userId) token = null;

    return token;
  }

  @Post()
  @ApiOperation({ summary: '대기열 추가' })
  async setUserWaitQueue({ userId }): Promise<object> {
    const state = 'WAITING';
    const validateId = this.userWaitQueue.find(
      (entry) => entry.userId === userId,
    );

    if (validateId) throw new Error('이미 대기열이 배정 되어있습니다.');

    const userEntry = { idx: this.currentIdx++, userId, state };

    this.userWaitQueue.push(userEntry);

    return userEntry;
  }
}
