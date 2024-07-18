import { ConcertModel, ConcertOptionsRoomModel } from '../models/concert.model';

export const concertRepositorySymbol = Symbol.for('ConcertRepository');

export interface ConcertRepository {
  findByAll(): Promise<ConcertModel[]>;
  saveConcert(concertModel: ConcertModel): Promise<ConcertModel>;
  delConcert(concertId: number): Promise<object>;
}
