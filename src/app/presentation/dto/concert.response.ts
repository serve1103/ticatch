import { ApiProperty } from '@nestjs/swagger';
import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
  ConcertRoomState,
} from '@app/domain/models/concert.model';

export class ConcertOptionsDto {
  @ApiProperty({ description: '콘서트 오픈 날짜' })
  openedAt: Date;

  @ApiProperty({ description: '콘서트 클로즈 날짜' })
  closedAt: Date;

  @ApiProperty({ description: '최대 수용 인원' })
  maxCapacity: number;

  @ApiProperty({ description: '현재 신청 인원' })
  applyCapacity: number;

  @ApiProperty({ description: '콘서트 ID', required: false })
  concertIdx?: number;

  constructor(option: ConcertOptionsModel) {
    this.openedAt = option.openedAt;
    this.closedAt = option.closedAt;
    this.maxCapacity = option.maxCapacity;
    this.applyCapacity = option.applyCapacity;
    this.concertIdx = option.concertIdx;
  }
}

export class ConcertResponseDto {
  @ApiProperty({ description: '콘서트 ID' })
  id: number;

  @ApiProperty({ description: '콘서트 이름' })
  concertName: string;

  constructor(concert: ConcertModel) {
    this.id = concert.id;
    this.concertName = concert.concertName;
  }
}

export class ConcertDetailsDto {
  @ApiProperty({ description: '콘서트 ID' })
  id: number;

  @ApiProperty({ description: '콘서트 이름' })
  concertName: string;

  @ApiProperty({ type: [ConcertOptionsDto], description: '콘서트 옵션 목록' })
  options: ConcertOptionsDto[];

  constructor(concert: ConcertModel) {
    this.id = concert.id;
    this.concertName = concert.concertName;
    this.options = concert.options.map(
      (option) => new ConcertOptionsDto(option),
    );
  }
}

export class ConcertOptionsRoomDto {
  @ApiProperty({ description: '콘서트 옵션 ID' })
  concertOptionsIdx: number;

  @ApiProperty({ description: '룸 번호' })
  roomNumber: number;

  @ApiProperty({ description: '룸 가격' })
  roomPrice: number;

  @ApiProperty({ description: '사용자 ID' })
  userId: string;

  @ApiProperty({ enum: ConcertRoomState, description: '상태' })
  state: ConcertRoomState;

  @ApiProperty({ description: 'ID', required: false })
  id?: number;

  constructor(room: ConcertOptionsRoomModel) {
    this.concertOptionsIdx = room.concertOptionsIdx;
    this.roomNumber = room.roomNumber;
    this.roomPrice = room.roomPrice;
    this.userId = room.userId;
    this.state = room.state;
    this.id = room.id;
  }
}

export class AvailableSeatsResponseDto {
  @ApiProperty({ type: ConcertOptionsDto, description: '콘서트 옵션' })
  concertOption: ConcertOptionsDto;

  @ApiProperty({
    type: [ConcertOptionsRoomDto],
    description: '예약 가능 좌석 목록',
  })
  rooms: ConcertOptionsRoomDto[];

  constructor(data: {
    concertOption: ConcertOptionsModel;
    rooms: ConcertOptionsRoomModel[];
  }) {
    this.concertOption = new ConcertOptionsDto(data.concertOption);
    this.rooms = data.rooms.map((room) => new ConcertOptionsRoomDto(room));
  }
}
