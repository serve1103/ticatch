import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '@app/domain/models/concert.model';

export const concertCacheRepositorySymbol = Symbol.for(
  'ConcertCacheRepository',
);

export interface ConcertCacheRepository {
  findById(concertId?: number): Promise<ConcertModel[]>;
  setCacheConcert(concertId: number, concertModels: ConcertModel[]);
}
