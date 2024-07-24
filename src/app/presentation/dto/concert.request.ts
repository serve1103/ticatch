import { ApiProperty } from '@nestjs/swagger';

export class GetConcertByIdDto {
  @ApiProperty({ description: '콘서트 ID' })
  concertId: number;
}

export class GetAvailableSeatsDto {
  @ApiProperty({ description: '콘서트 옵션 ID' })
  concertOptionsId: number;
}
