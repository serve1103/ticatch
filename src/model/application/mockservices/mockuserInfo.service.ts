import { Injectable } from '@nestjs/common';
import { GetUserModel } from '../../../model/domain/models/getUser.model';
import { LoginModel } from '../../../model/domain/models/login.model';

@Injectable()
export class MockUserInfoService {
  async login(loginModel: LoginModel): Promise<GetUserModel> {
    const { userId, userPw } = loginModel;

    if (!userPw || userPw.length < 0)
      throw new Error('비밀번호를 입력해주세요.');

    if (userId !== 'test1') throw new Error('유효하지 않은 아이디입니다.');

    const userName = '테스트';
    const result = { userId, userName };
    return result;
  }
}
