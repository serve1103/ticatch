import { ConcertModel } from '../models/concert.model';

export const concertRepositorySymbol = Symbol.for('ConcertRepository');

export interface ConcertRepository {
  findAllDates(): Promise<string[]>;
  findSeatsByDate(date: string): Promise<string[]>;
  updateSeats(date: string, seats: string[]): Promise<ConcertModel>;
}
