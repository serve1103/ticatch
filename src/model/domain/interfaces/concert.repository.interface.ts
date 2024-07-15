import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '../models/concert.model';

export const concertRepositorySymbol = Symbol.for('ConcertRepository');

export interface ConcertRepository {
  findByAll(): Promise<ConcertModel[]>;
  saveConcert(concertModel: ConcertModel): Promise<ConcertModel>;
  delConcert(concertId: number): Promise<object>;

  findByConcertOptionsId(concertId: number): Promise<ConcertOptionsModel[]>;
  saveConcertOptions(
    concertOptionsModel: ConcertOptionsModel,
  ): Promise<ConcertOptionsModel>;
  delConcertOptions(concertOptionsId: number): Promise<object>;

  findByConcertOptionsRoomId(
    concertOptionsId: number,
  ): Promise<ConcertOptionsRoomModel>;
  saveConcertOptionsRoom(
    concertOptionsRoomModel: ConcertOptionsRoomModel,
  ): Promise<ConcertOptionsRoomModel>;
  delConcertOptionsRoom(concertId: number): Promise<object>;
}
