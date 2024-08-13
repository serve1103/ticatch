import {
  QueueState,
  UserWaitQueueModel,
} from '@app/domain/models/userWaitQueue.model';
import { UserWaitQueueResponseDto } from '@app/presentation/api/dto/userWaitQueue.response.dto';
import { CreateUserWaitQueueDto } from '@app/presentation/api/dto/userWaitQueue.request.dto';

export class PresentationMapper {
  static toResponse(model: UserWaitQueueModel): UserWaitQueueResponseDto {
    return new UserWaitQueueResponseDto(
      model.userId,
      model.state,
      model.createdAt,
      model.expiredAt,
    );
  }

  static toDomain(dto: CreateUserWaitQueueDto): UserWaitQueueModel {
    return new UserWaitQueueModel(dto.userId, QueueState.WAITING, new Date());
  }
}
