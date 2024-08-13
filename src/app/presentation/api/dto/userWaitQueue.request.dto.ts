import { ApiProperty } from '@nestjs/swagger';

export class CreateUserWaitQueueDto {
  @ApiProperty({ description: '유저 ID' })
  userId: string;
}
