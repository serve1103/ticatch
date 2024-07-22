import { ApiProperty } from '@nestjs/swagger';

export class GetUserAmountDto {
  @ApiProperty({
    example: 'test',
    description: '유저 ID',
  })
  userId: string;
}

export class SetUserAmountDto {
  @ApiProperty({
    example: 'test',
    description: '유저 ID',
  })
  userId: string;

  @ApiProperty({
    example: 10000,
    description: '충전 금액',
  })
  userAmount: number;
}
