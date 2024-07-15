import { ConcertService } from '../domain/services/concert.service';
import { UserInfoService } from '../domain/services/userInfo.service';

export class ConcertUseCase {
  constructor(
    private readonly concertService: ConcertService,
    private readonly userInfoService: UserInfoService,
  ) {}

  /**
   * 콘서트 조회
   * 콘서트 상세조회 - 대기열 발생
   * 콘서트 좌석조회
   * 콘서트 좌석예약
   * 콘서트 좌석 결제 - 예약 후 5분이 지났는지 확인 필
   */
  async SearchConcert(concertId: number, userId: string) {
    // 콘서트 조회
    return await this.concertService.getConcert(concertId);
  }

  async getConcertOptions(concertId: number, userId: string) {
    const getUserWait = await this.userInfoService.getUserWait(userId);

    if (!getUserWait) {
      // 대기열 발생
      const setUserWait = await this.userInfoService.setUserWait({
        userId,
        concertId,
      });
    }

    // 대기순서가 되면 조회 시도
    if (getUserWait === 'READY')
      await this.concertService.getConcertOption(concertId);
  }

  async getConcertOptionsRoom(ConcertOpIdx: number) {
    return await this.concertService.getConcertOptionsRoom(ConcertOpIdx);
    // 활성화 좌석만 조회
    // 유저ID, 좌석번호, 가격
  }
}
