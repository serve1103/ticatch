import { Injectable } from '@nestjs/common';
import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '@app/domain/models/concert.model';
import { ConcertService } from '@app/domain/services/concert.service';
import { UserInfoService } from '@app/domain/services/userInfo.service';

@Injectable()
export class ConcertUseCase {
  constructor(
    private readonly concertService: ConcertService,
    private readonly userInfoService: UserInfoService,
  ) {}

  /**
   * 전체 콘서트 조회
   * @returns 모든 콘서트 정보
   */
  async searchAllConcerts(): Promise<ConcertModel[]> {
    return await this.concertService.getAllConcerts();
  }

  /**
   * 콘서트 옵션 조회
   * @param concertId 콘서트 ID
   * @returns 콘서트 옵션 정보
   */
  async getConcertOptions(concertId: number): Promise<ConcertOptionsModel[]> {
    return await this.concertService.getConcertOptions(concertId);
  }

  /**
   * 콘서트 옵션 좌석 조회
   * @param concertOptionsIdx 콘서트 옵션 ID
   * @returns 콘서트 옵션 좌석 정보
   */
  async getConcertOptionsRoom(
    concertOptionsIdx: number,
  ): Promise<ConcertOptionsRoomModel[]> {
    return await this.concertService.getConcertOptionsRoom(concertOptionsIdx);
  }
}
