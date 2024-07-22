import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConcertUseCase } from '@app/application/concert.use-case';
import {
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '@app/domain/models/concert.model';

@ApiTags('콘서트 관리')
@Controller('concert')
export class ConcertController {
  constructor(private readonly concertUseCase: ConcertUseCase) {}

  @ApiOperation({ summary: '전체 콘서트 조회' })
  @Get('/all')
  async getAllConcerts(): Promise<ConcertResponseDto[]> {
    return this.concertUseCase.searchAllConcerts();
  }

  @ApiOperation({ summary: '콘서트 옵션 조회' })
  @Get('/:concertId/options')
  async getConcertOptions(
    @Param('concertId') concertId: number,
  ): Promise<ConcertOptionsModel[]> {
    return this.concertUseCase.getConcertOptions(concertId);
  }

  @ApiOperation({ summary: '콘서트 옵션 좌석 조회' })
  @Get('/options/:concertOptionsIdx/rooms')
  async getConcertOptionsRoom(
    @Param('concertOptionsIdx') concertOptionsIdx: number,
  ): Promise<ConcertOptionsRoomModel[]> {
    return this.concertUseCase.getConcertOptionsRoom(concertOptionsIdx);
  }
}
