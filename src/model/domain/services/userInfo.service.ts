import { Inject, Injectable } from '@nestjs/common';
import {
  UserInfoRepository,
  userInfoRepositorySymbol,
} from '../interfaces/userInfo.repsitory.interface';
import { UserInfoModel } from '../models/userInfo.model';

@Injectable()
export class UserInfoService {
  constructor(
    @Inject(userInfoRepositorySymbol)
    private readonly userRepository: UserInfoRepository,
  ) {}

  async getUserInfoList(): Promise<UserInfoModel[]> {
    return await this.userRepository.findAll();
  }

  async getUserInfo(userId: string): Promise<UserInfoModel> {
    const userInfo = await this.userRepository.findByUserId(userId);
    if (!userInfo) throw new Error('유저를 찾을 수 없습니다.');
    return userInfo;
  }

  async setUserInfo(userInfoModel: UserInfoModel): Promise<UserInfoModel> {
    const userFind = await this.userRepository.findByUserId(userInfoModel.id);

    // 등록된 유저 확인
    if (userFind) throw new Error('이미 등록된 아이디 입니다.');

    // 유저 저장
    const savedUserInfo = await this.userRepository.save(userInfoModel);

    return savedUserInfo;
  }

  async delUserInfo(userId: string): Promise<boolean> {
    const userFind = await this.userRepository.findByUserId(userId);
    // 등록된 유저 확인
    if (!userFind) throw new Error('존재하지 않는 아이디 입니다.');

    // 삭제 결과 반환
    return await this.userRepository.remove(userId);
  }
}
