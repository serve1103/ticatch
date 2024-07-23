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

  // 전체 조회
  async getConcertAll(): Promise<ConcertModel[]> {
    return await this.concertService.getConcertList();
  }
  // 특정 콘서트 일자 조회
  // 특정 콘서트 특정 일자 예약가능 좌석 조회
}
