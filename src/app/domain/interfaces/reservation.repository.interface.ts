import { EntityManager } from 'typeorm';
import { ReservationModel } from '../models/reservation.model';

export const ReservationRepositorySymbol = Symbol.for('ReservationRepository');

export interface ReservationRepository {
  save(
    reservationModel: ReservationModel,
    entityManager?: EntityManager,
  ): Promise<ReservationModel>;
  findById(reservationId: number): Promise<ReservationModel>;
}
