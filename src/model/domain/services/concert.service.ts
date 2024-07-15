import { Injectable } from '@nestjs/common';

@Injectable()
export class ConcertService {
  // 콘서트 전체 조회
  getConcert(concertId: number): object {
    const concertName = '강수지 드림콘서트';
    return {
      concertId,
      concertName,
    };
  }

  // 콘서트 상세 조회
  getConcertOption(concertId: number) {}

  // 콘서트 상세 좌석 조회
  getConcertOptionsRoom(ConcertOpIdx: number): object {
    return {
      ConcertOpIdx,
    };
  }

  // 콘서트 상세 좌석 예약
  setConcertOptionsRoom(concertId: number, userId: string) {}

  updateConcertRoom(concertId: number) {}
}
