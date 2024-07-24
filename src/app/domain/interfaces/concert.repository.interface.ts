import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '@app/domain/models/concert.model';

export const concertRepositorySymbol = Symbol.for('ConcertRepository');

export interface ConcertRepository {
  findAllOrConcertId(concertId?: number): Promise<ConcertModel[]>;
  findSeatsByDate(
    concertOptionsId: number,
  ): Promise<
    { concertOption: ConcertOptionsModel; rooms: ConcertOptionsRoomModel[] }[]
  >;
}
