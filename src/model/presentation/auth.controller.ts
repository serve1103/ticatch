import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('/login')
  async login({ userId, userPw }): Promise<object> {
    const token = '1q2w3e4r';

    if (userPw !== '1') throw new Error('비밀번호가 일치하지 않습니다.');

    const userData = { userId, token };

    return userData;
  }

  @Post('/logout')
  async logout(userId: string): Promise<string> {
    let token = '1q2w3e4r';

    if (userId) token = null;

    return token;
  }
}
