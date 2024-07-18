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

  // 좌석 상태 변경

  async saveConcertOptionsRoom(
    concertOptionsRoomId: number,
  ): Promise<ConcertOptionsRoomModel> {
    // 해당 좌석 정보를 조회
    const concertOptionsRooms =
      await this.concertOptionsRoomRepository.findByConcertOptionsRoomId(
        concertOptionsRoomId,
      );
    if (!concertOptionsRooms || concertOptionsRooms.length === 0) {
      throw new Error('좌석을 찾을 수 없습니다.');
    }

    // 특정 id에 해당하는 좌석을 찾음
    const concertOptionsRoom = concertOptionsRooms.find(
      (room) => room.id === concertOptionsRoomId,
    );
    if (!concertOptionsRoom) {
      throw new Error('좌석을 찾을 수 없습니다.');
    }

    // 좌석 상태를 변경 (예: 'available' -> 'TAKEN')
    concertOptionsRoom.state = 'TAKEN';

    // 변경된 상태를 저장
    return this.concertOptionsRoomRepository.saveConcertOptionsRoom(
      concertOptionsRoom,
    );
  }
}
