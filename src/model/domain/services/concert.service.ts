import { Injectable } from '@nestjs/common';
import { ConcertRepository } from '../interfaces/concert.repository.interface';
import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '../models/concert.model';
import { ConcertOptionsRepository } from '../interfaces/concertOptions.repository.interface';
import { ConcertOptionsRoomRepository } from '../interfaces/concertOptionsRoom.repository.interface';

@Injectable()
export class ConcertService {
  constructor(
    private readonly concertRepository: ConcertRepository,
    private readonly concertOptionsRepository: ConcertOptionsRepository,
    private readonly concertOptionsRoomRepository: ConcertOptionsRoomRepository,
  ) {}

  // 전체 콘서트 조회
  async getAllConcerts(): Promise<ConcertModel[]> {
    return this.concertRepository.findByAll();
  }

  // 콘서트 상세 조회
  async getConcertOptions(concertId: number): Promise<ConcertOptionsModel[]> {
    return this.concertOptionsRepository.findByConcertOptionsId(concertId);
  }

  // 콘서트 좌석조회
  async getConcertOptionsRoom(
    concertOptionsIdx: number,
  ): Promise<ConcertOptionsRoomModel[]> {
    return this.concertOptionsRoomRepository.findByConcertOptionsRoomId(
      concertOptionsIdx,
    );
  }

  // 판매가능 좌석 조회
  async getAvailableRooms() {}
  // 좌석 상태 변경
}
