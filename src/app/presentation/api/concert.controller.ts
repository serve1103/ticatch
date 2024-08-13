import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ConcertUseCase } from '@app/application/concert.use-case';
import {
  AvailableSeatsResponseDto,
  ConcertDetailsDto,
  ConcertResponseDto,
} from '@app/presentation/api/dto/concert.response';

@ApiTags('콘서트 관리')
@Controller('concerts')
export class ConcertController {
  constructor(private readonly concertUseCase: ConcertUseCase) {}

  @ApiOperation({ summary: '전체 콘서트 조회' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 콘서트를 조회했습니다.',
    type: ConcertResponseDto,
    isArray: true,
  })
  @Get()
  async getConcertAll(): Promise<ConcertResponseDto[]> {
    const concerts = await this.concertUseCase.getConcertAll();
    return concerts.map((concert) => new ConcertResponseDto(concert));
  }

  @ApiOperation({ summary: '특정 콘서트 조회' })
  @ApiQuery({
    name: 'concertId',
    description: '조회할 콘서트의 ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 특정 콘서트를 조회했습니다.',
    type: ConcertDetailsDto,
  })
  @Get('details')
  async getConcertById(
    @Query('concertId') concertId: number,
  ): Promise<ConcertDetailsDto[]> {
    const concerts = await this.concertUseCase.getConcertById(concertId);
    return concerts.map((concert) => new ConcertDetailsDto(concert));
  }

  @ApiOperation({ summary: '특정 콘서트의 특정 일자 예약 가능 좌석 조회' })
  @ApiQuery({
    name: 'concertId',
    description: '콘서트 옵션의 ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 예약 가능 좌석을 조회했습니다.',
    type: AvailableSeatsResponseDto,
    isArray: true,
  })
  @Get('available-seats')
  async getAvailableSeats(
    @Query('concertId') concertOptionsId: number,
  ): Promise<AvailableSeatsResponseDto[]> {
    const availableSeats =
      await this.concertUseCase.getAvailableSeats(concertOptionsId);
    return availableSeats.map((seat) => new AvailableSeatsResponseDto(seat));
  }
}
