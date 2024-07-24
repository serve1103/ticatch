import { Injectable } from '@nestjs/common';
import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '@app/domain/models/concert.model';
import { ConcertService } from '@app/domain/services/concert.service';

@Injectable()
export class ConcertUseCase {
  constructor(private readonly concertService: ConcertService) {}

  // 전체 조회 (concertId가 없는 경우)
  async getConcertAll(): Promise<ConcertModel[]> {
    return await this.concertService.getConcertAll();
  }

  // 특정 콘서트 일자 조회 (concertId가 있는 경우)
  async getConcertById(concertId: number): Promise<ConcertModel[]> {
    return await this.concertService.getConcertAll(concertId);
  }

  // 특정 콘서트 특정 일자 예약가능 좌석 조회
  async getAvailableSeats(
    concertOptionsId: number,
  ): Promise<
    { concertOption: ConcertOptionsModel; rooms: ConcertOptionsRoomModel[] }[]
  > {
    return await this.concertService.getAvailableSeats(concertOptionsId);
  }
}
