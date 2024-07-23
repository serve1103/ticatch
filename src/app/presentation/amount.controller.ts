import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUserAmountDto, SetUserAmountDto } from './dto/amount.request.dto';
import { UserAmountResponseDto } from './dto/amount.response.dto';
import { UserAmountUseCase } from '@app/application/amount.use-case';

@ApiTags('충전 관리')
@Controller('amount')
export class AmountController {
  constructor(private readonly userAmountUseCase: UserAmountUseCase) {}
  // 금액 충전
  @ApiOperation({ summary: '금액 충전' })
  @Post('/setChargeAmount')
  async setChargeAmount(setUserAmountDto: SetUserAmountDto): Promise<object> {
    return this.userAmountUseCase.chargeUserPoint(setUserAmountDto);
  }

  // 금액 조회
  @ApiOperation({ summary: '충전 금액 조회' })
  @Get('/getChargeAmount')
  async getChargeAmount(
    @Body() getUserAmountDto: GetUserAmountDto,
  ): Promise<object> {
    return new UserAmountResponseDto(await this.amountService.getUserAmount());
  }

  // 금액 조회
  @ApiOperation({ summary: '충전 금액 사용' })
  @Post('/useChargeAmount')
  async useChargeAmount({ userId, usingAmount }): Promise<object> {
    const userAmount = 10000;

    if (!userId) throw new Error('유저를 찾을 수 없습니다.');

    if (usingAmount < 0) throw new Error('음수는 사용할 수 없습니다.');

    if (usingAmount === null || usingAmount === undefined)
      throw new Error('사용 금액을 입력해주세요.');

    if (userAmount < usingAmount)
      throw new Error('사용금액은 보유금액보다 클 수 없습니다.');

    const usedAmount = userAmount - usingAmount;

    return { userId, usedAmount };
  }
}
