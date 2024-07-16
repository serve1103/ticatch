import { Injectable } from '@nestjs/common';
import { ConcertRepository } from '../interfaces/concert.repository.interface';
import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '../models/concert.model';

@Injectable()
export class ConcertService {
  constructor(
    private readonly concertRepository: ConcertRepository,
    private readonly concertOptionsRepository: ConcertOptionsRepository,
  ) {}

  async getAllConcerts(): Promise<ConcertModel[]> {
    return this.concertRepository.findAll();
  }

  async getConcert(concertId: number): Promise<ConcertModel> {
    return this.concertRepository.findById(concertId);
  }

  async getConcertOptions(concertId: number): Promise<ConcertOptionsModel[]> {
    return this.concertOptionsRepository.findByConcertId(concertId);
  }

  async getConcertOptionsRoom(
    concertOptionsIdx: number,
  ): Promise<ConcertOptionsRoomModel[]> {
    return this.concertOptionsRepository.findRoomsByOptionId(concertOptionsIdx);
  }
}
