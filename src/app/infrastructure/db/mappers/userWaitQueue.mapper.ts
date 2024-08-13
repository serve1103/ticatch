import { UserWaitQueueModel } from '@app/domain/models/userWaitQueue.model';
import {
  QueueState,
  UserWaitQueue,
} from '@app/infrastructure/db/entities/userWaitQueue.entity';

export class InfrastructureMapper {
  static toDomain(entity: UserWaitQueue): UserWaitQueueModel {
    return new UserWaitQueueModel(
      entity.userId,
      entity.state as QueueState,
      entity.createdAt,
      entity.expiredAt,
    );
  }

  static toEntity(model: UserWaitQueueModel): UserWaitQueue {
    const entity = new UserWaitQueue();
    entity.userId = model.userId;
    entity.state = model.state;
    entity.createdAt = model.createdAt;
    entity.expiredAt = model.expiredAt;
    return entity;
  }
}
