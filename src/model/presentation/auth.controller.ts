import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('/login')
  login({ userId, userPw }): string {
    return '1q2w3e4r';
  }
}
