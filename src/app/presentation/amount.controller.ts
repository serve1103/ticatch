import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  GetUserAmountDto,
  SetUserAmountDto,
} from '@app/presentation/dto/amount.request.dto';
import { UserAmountResponseDto } from '@app/presentation/dto/amount.response.dto';
import { UserAmountUseCase } from '@app/application/amount.use-case';

@ApiTags('충전 관리')
@Controller('amount')
export class AmountController {
  constructor(private readonly userAmountUseCase: UserAmountUseCase) {}
  // 금액 충전
  @ApiOperation({ summary: '금액 충전' })
  @Post('/setChargeAmount')
  async setChargeAmount(
    setUserAmountDto: SetUserAmountDto,
  ): Promise<UserAmountResponseDto> {
    return this.userAmountUseCase.chargeUserPoint(setUserAmountDto);
  }

  // 금액 조회
  @ApiOperation({ summary: '충전 금액 조회' })
  @Get('/getChargeAmount')
  async getChargeAmount(
    @Body() getUserAmountDto: GetUserAmountDto,
  ): Promise<UserAmountResponseDto> {
    return await this.userAmountUseCase.getUserPoint(getUserAmountDto.userId);
  }

  // 금액 사용
  @ApiOperation({ summary: '충전 금액 사용' })
  @Post('/useChargeAmount')
  async useChargeAmount(
    setUserAmountDto: SetUserAmountDto,
  ): Promise<UserAmountResponseDto> {
    return await this.userAmountUseCase.useUserPoint(setUserAmountDto);
  }
}
