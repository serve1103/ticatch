import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('콘서트 관리')
@Controller('concert')
export class ConcertController {
  @ApiOperation({ summary: '콘서트 조회' })
  @Post('/getConcert')
  async getConcert(concertName: string): Promise<object[]> {
    // 콘서트 명을 찾지 못했을 때
    if (concertName === null || concertName === undefined)
      throw new Error('콘서트를 찾을 수 없습니다.');

    // 콘서트 명을 입력하지 않았을 때
    if (concertName === '') throw new Error('콘서트 명을 입력해주세요.');

    const concertOpenedDate = Date.now();
    const concertClosedDate = Date.now() + 3;
    const concertMaxCapacity = 50;
    const concertApplyCapacity = 50;

    return [
      {
        concertName,
        concertOpenedDate,
        concertClosedDate,
        concertMaxCapacity,
        concertApplyCapacity,
      },
    ];
  }
  @ApiOperation({ summary: '콘서트 등록' })
  @Post('/setConcert')
  async setConcert({
    concertName,
    concertOpenedDate,
    concertClosedDate,
    concertMaxCapacity,
  }): Promise<object> {
    const concertId = '1';
    const concertApplyCapacity = 0;

    if (concertName === '') throw new Error('콘서트 명을 입력해주세요.');

    if (concertOpenedDate > concertClosedDate)
      throw new Error('마감일이 오픈일보다 적습니다.');

    if (concertMaxCapacity <= 0)
      throw new Error('정원은 1명 이상이여야 합니다.');

    return {
      concertId,
      concertName,
      concertOpenedDate,
      concertClosedDate,
      concertMaxCapacity,
      concertApplyCapacity,
    };
  }

  @ApiOperation({ summary: '콘서트 일자 조회' })
  @Post('/getConcertDate')
  async getConcertDate(concertName: string): Promise<object[]> {
    if (concertName === null || concertName === undefined)
      throw new Error('콘서트를 찾을 수 없습니다.');
    const concertOpenedDate1 = '2024-03-08';
    const concertOpenedDate2 = '2024-11-03';
    const concertOpenedDate3 = '2025-01-21';
    return [
      { concertName, concertOpenedDate1 },
      { concertName, concertOpenedDate2 },
      { concertName, concertOpenedDate3 },
    ];
  }

  @ApiOperation({ summary: '콘서트 일자별 자리 조회' })
  @Post('/getConcertDateToCapacity')
  async getConcertDateToCapacity({
    concertName,
    concertOpenedDate,
  }): Promise<object> {
    if (concertOpenedDate === null || concertOpenedDate === undefined)
      throw new Error('날짜를 찾을 수 없습니다.');
    const concertSeatNumbers = [10, 20, 30];
    return {
      concertName,
      concertOpenedDate,
      concertSeatNumbers,
    };
  }
  @ApiOperation({ summary: '콘서트 일자별 자리 등록' })
  @Post('/setConcertDateToCapacity')
  async setConcertDateToCapacity({
    concertName,
    concertOpenedDate,
    concertSeatNumber,
  }): Promise<boolean> {
    if (concertSeatNumber === null || concertSeatNumber === undefined)
      throw new Error('좌석을 선택해 주세요.');
    return true;
  }

  @ApiOperation({ summary: '콘서트 일자별 자리 삭제' })
  @Post('/delConcertDateToCapacity')
  async delConcertDateToCapacity({
    concertName,
    concertOpenedDate,
    concertSeatNumber,
  }): Promise<boolean> {
    if (concertSeatNumber === null || concertSeatNumber === undefined)
      throw new Error('좌석을 선택해 주세요.');
    return true;
  }
}
