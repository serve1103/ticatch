import { Controller, Get, Param, Query } from '@nestjs/common';
import { ConcertUseCase } from '@app/application/concert.use-case';
import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '@app/domain/models/concert.model';

@Controller('concerts')
export class ConcertController {
  constructor(private readonly concertUseCase: ConcertUseCase) {}

  // 전체 콘서트 조회
  @Get()
  async getConcertAll(): Promise<ConcertModel[]> {
    return await this.concertUseCase.getConcertAll();
  }

  // 특정 콘서트 일자 조회
  @Get(':concertId')
  async getConcertById(
    @Param('concertId') concertId: number,
  ): Promise<ConcertModel[]> {
    return await this.concertUseCase.getConcertById(concertId);
  }

  // 특정 콘서트 특정 일자 예약가능 좌석 조회
  @Get(':concertId/seats')
  async getAvailableSeats(
    @Param('concertId') concertOptionsId: number,
  ): Promise<
    { concertOption: ConcertOptionsModel; rooms: ConcertOptionsRoomModel[] }[]
  > {
    return await this.concertUseCase.getAvailableSeats(concertOptionsId);
  }
}
