import { ApiProperty } from '@nestjs/swagger';
import { QueueState } from '@app/domain/models/userWaitQueue.model';

export class UserWaitQueueResponseDto {
  @ApiProperty({ description: '유저 ID' })
  userId: string;

  @ApiProperty({ enum: QueueState, description: '대기열 상태' })
  state: QueueState;

  @ApiProperty({ description: '대기열 생성일' })
  createdAt: Date;

  @ApiProperty({ description: '대기열 만료일', required: false })
  expiredAt?: Date;

  constructor(
    userId: string,
    state: QueueState,
    createdAt: Date,
    expiredAt?: Date,
  ) {
    this.userId = userId;
    this.state = state;
    this.createdAt = createdAt;
    this.expiredAt = expiredAt;
  }
}
