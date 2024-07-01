import { Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';

@Controller('userInfo')
export class UserInfoController {
    @Post()
    async login(loginDto: LoginDto): Promise<void>{
        
    }
}
