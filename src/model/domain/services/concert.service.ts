import { Injectable } from '@nestjs/common';

@Injectable()
export class ConcertService {
  getConcert(concertId: string): object {
    const concertName = '강수지 드림콘서트';
    return {
      concertId,
      concertName,
    };
  }
}
