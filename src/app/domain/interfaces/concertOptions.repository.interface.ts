import { ConcertOptionsModel } from '@app/domain/models/concert.model';

export const concertOptionsSymbol = Symbol.for('ConcertOptions');

export interface ConcertOptionsRepository {
  // findByConcertOptionsId(concertId: number): Promise<ConcertOptionsModel[]>;
  // saveConcertOptions(
  //   concertOptionsModel: ConcertOptionsModel,
  // ): Promise<ConcertOptionsModel>;
  // delConcertOptions(concertOptionsId: number): Promise<object>;
}
