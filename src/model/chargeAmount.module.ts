import { Module } from '@nestjs/common';
import { ChargeAmountController } from './presentation/chargeAmount.controller';

@Module({
  controllers: [ChargeAmountController],
})
export class ChargeAmountModule {}
