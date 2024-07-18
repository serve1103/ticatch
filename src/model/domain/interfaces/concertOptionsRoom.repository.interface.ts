import { ConcertOptionsRoomModel } from '../models/concert.model';

export const concertOptionsRoomSymbol = Symbol.for('ConcertOptionsRoom');

export interface ConcertOptionsRoomRepository {
  findByConcertOptionsRoomId(
    concertOptionsId: number,
  ): Promise<ConcertOptionsRoomModel[]>;
  saveConcertOptionsRoom(
    concertOptionsRoomModel: ConcertOptionsRoomModel,
  ): Promise<ConcertOptionsRoomModel>;
}
