import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from 'src/model/domain/models/concert.model';
import { Concert } from 'src/model/infrastructure/entities/concert.entity';
import { ConcertOptions } from 'src/model/infrastructure/entities/concertOptions.entity';
import { ConcertOptionsRoom } from '../entities/concertOptionsRoom.entity';

export class ConcertMapper {
  static toDomain(entity: Concert): ConcertModel {
    return new ConcertModel(entity.concertName, entity.concertIdx);
  }
  static toEntity(domain: ConcertModel): Concert {
    const entity = new Concert();

    entity.concertIdx = domain.id;
    entity.concertName = domain.name;

    return entity;
  }
}

export class ConcertOptionsMapper {
  static toDomain(entity: ConcertOptions): ConcertOptionsModel {
    return new ConcertOptionsModel(
      entity.concertOpenedDate,
      entity.concertClosedDate,
      entity.concertMaxCapacity,
      entity.concertApplyCapacity,
      entity.concertIdx,
    );
  }

  static toEntity(domain: ConcertOptionsModel): ConcertOptions {
    const entity = new ConcertOptions();

    entity.concertIdx = domain.concertIdx;
    entity.concertOpenedDate = domain.opened_at;
    entity.concertClosedDate = domain.closed_at;
    entity.concertMaxCapacity = domain.maxCapacity;
    entity.concertApplyCapacity = domain.applyCapacity;

    return entity;
  }
}

export class ConcertOptionsRoomMapper {
  static toDomain(entity: ConcertOptionsRoom): ConcertOptionsRoomModel {
    return new ConcertOptionsRoomModel(
      entity.concertOptionsId,
      entity.concertRoomNumber,
      entity.concertRoomPrice,
      entity.userId,
      entity.state,
    );
  }

  static toEntity(domain: ConcertOptionsRoomModel): ConcertOptionsRoom {
    const entity = new ConcertOptionsRoom();

    entity.concertOptionsId = domain.concertOptionsIdx;
    entity.concertRoomNumber = domain.roomNumber;
    entity.concertRoomPrice = domain.roomPrice;
    entity.userId = domain.userId;
    entity.state = domain.state;

    return entity;
  }
}
