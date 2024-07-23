import {
  ConcertModel,
  ConcertOptionsModel,
} from '@app/domain/models/concert.model';

export const concertRepositorySymbol = Symbol.for('ConcertRepository');

export interface ConcertRepository {
  findAll(concertId: number): Promise<ConcertModel[]>;
  findSeatsByDate(concertOptionsId: number): Promise<ConcertOptionsModel[]>;
}
