import { Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { GetUserDto } from '../dtos/getUser.dto';
import { MockUserInfoService } from '../../../model/application/mockservices/mockuserInfo.service';

@Controller('userInfo')
export class UserInfoController {
  constructor(private readonly mockUserInfoService: MockUserInfoService) {}
  @Post()
  async login(loginDto: LoginDto): Promise<GetUserDto> {
    return await this.mockUserInfoService.login(loginDto);
  }
}
