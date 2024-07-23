import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '@app/domain/models/concert.model';
import { Concert } from '@app/infrastructure/entities/concert.entity';
import { ConcertOptions } from '@app/infrastructure/entities/concertOptions.entity';
import { ConcertOptionsRoom } from '@app/infrastructure/entities/concertOptionsRoom.entity';

export class ConcertMapper {
  static toDomain(concert: Concert, options: ConcertOptions[]): ConcertModel {
    const optionsModels = options.map(
      (option) =>
        new ConcertOptionsModel(
          option.concertOpenedDate,
          option.concertClosedDate,
          option.concertMaxCapacity,
          option.concertApplyCapacity,
          option.concertIdx,
        ),
    );
    return new ConcertModel(concert.id, concert.concertName, optionsModels);
  }

  static toEntity(domain: ConcertModel): Concert {
    const entity = new Concert();
    entity.id = domain.id;
    entity.concertName = domain.concertName;

    return entity;
  }
}

export class ConcertOptionsMapper {
  static toOptionsModel(entity: ConcertOptions): ConcertOptionsModel {
    return new ConcertOptionsModel(
      entity.concertOpenedDate,
      entity.concertClosedDate,
      entity.concertMaxCapacity,
      entity.concertApplyCapacity,
      entity.concertIdx,
    );
  }

  static toOptionsRoomModel(
    entity: ConcertOptionsRoom,
  ): ConcertOptionsRoomModel {
    return new ConcertOptionsRoomModel(
      entity.concertOptionsId,
      entity.concertRoomNumber,
      entity.concertRoomPrice,
      entity.userId,
      entity.state,
      entity.idx,
    );
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
