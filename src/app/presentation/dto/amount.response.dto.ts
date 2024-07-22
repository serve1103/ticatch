import { ApiProperty } from '@nestjs/swagger';

export class UserAmountResponseDto {
  userId: string;
  userAmount: number;
}
