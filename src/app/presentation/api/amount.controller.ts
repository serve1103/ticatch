import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SetUserAmountDto } from '@app/presentation/api/dto/amount.request.dto';
import { UserAmountResponseDto } from '@app/presentation/api/dto/amount.response.dto';
import { UserAmountUseCase } from '@app/application/amount.use-case';

@ApiTags('충전 관리')
@Controller('amount')
export class AmountController {
  constructor(private readonly userAmountUseCase: UserAmountUseCase) {}

  // 금액 충전
  @ApiOperation({ summary: '금액 충전' })
  @Post('/setChargeAmount')
  async setChargeAmount(
    @Body() setUserAmountDto: SetUserAmountDto,
  ): Promise<UserAmountResponseDto> {
    return this.userAmountUseCase.chargeUserPoint(setUserAmountDto);
  }

  // 금액 조회
  @ApiOperation({ summary: '충전 금액 조회' })
  @Get('/getChargeAmount')
  async getChargeAmount(
    @Query('userId') userId: string,
  ): Promise<UserAmountResponseDto> {
    return await this.userAmountUseCase.getUserPoint(userId);
  }

  // 금액 사용
  @ApiOperation({ summary: '충전 금액 사용' })
  @Post('/useChargeAmount')
  async useChargeAmount(
    @Body() setUserAmountDto: SetUserAmountDto,
  ): Promise<UserAmountResponseDto> {
    return await this.userAmountUseCase.useUserPoint(setUserAmountDto);
  }
}
