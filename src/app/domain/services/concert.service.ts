import { Inject, Injectable } from '@nestjs/common';
import {
  ConcertRepository,
  concertRepositorySymbol,
} from '@app/domain/interfaces/concert.repository.interface';
import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '@app/domain/models/concert.model';

@Injectable()
export class ConcertService {
  constructor(
    @Inject(concertRepositorySymbol)
    private readonly concertRepository: ConcertRepository,
  ) {}

  async getConcertAll(concertId?: number): Promise<ConcertModel[]> {
    return await this.concertRepository.findAllOrConcertId(concertId);
  }

  async getAvailableSeats(
    concertOptionsId: number,
  ): Promise<
    { concertOption: ConcertOptionsModel; rooms: ConcertOptionsRoomModel[] }[]
  > {
    return await this.concertRepository.findSeatsByDate(concertOptionsId);
  }
}
