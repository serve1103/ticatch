import { ReservationModel } from '@app/domain/models/reservation.model';
import { Reservation } from '@app/infrastructure/db/entities/reservation.entity';

export class ReservationMapper {
  static toDomain(entity: Reservation): ReservationModel {
    return new ReservationModel(
      entity.reservationId,
      entity.userId,
      entity.concertId,
      entity.concertOptionId,
      entity.concertOptionRoomId,
      entity.status,
      entity.version,
    );
  }

  static toEntity(model: ReservationModel): Reservation {
    const entity = new Reservation();
    entity.reservationId = model.id;
    entity.userId = model.userId;
    entity.concertId = model.concertId;
    entity.concertOptionId = model.concertOptionsId;
    entity.concertOptionRoomId = model.concertOptionsRoomId;
    entity.status = model.status;
    entity.version = model.version;
    return entity;
  }
}
