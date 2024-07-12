import { ConcertService } from '../domain/services/concert.service';
import { UserInfoService } from '../domain/services/userInfo.service';

export class ConcertUseCase {
  constructor(
    private readonly concertService: ConcertService,
    private readonly userInfoService: UserInfoService,
  ) {}

  async Concert(concertId: string, userId: string) {
    // 콘서트 조회
    const searchConcert = await this.concertService.getConcert(concertId);
    // 대기열 발생
    const userWait = await this.userInfoService.setUserWait({
      userId,
      concertId,
    });
    if (userWait === 'WAIT') {
      // 콘서트 좌석 조회
      const searchConcertRoom =
        await this.concertService.getConcertRoom(concertId);
      // 콘서트 좌석 예약
      const userConcertRoom =
        await this.concertService.setConcertRoom(concertId);
      // 결제
      // 포인트 사용
      const useAmount = await this.userInfoService.useAmount({
        userId,
        amount,
      });
      // 성공 시 좌석 확정
      if (useAmount) await this.concertService.updateConcertRoom(concertId);
      else throw new Error('');
    }
  }
}
