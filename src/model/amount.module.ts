import { Module } from '@nestjs/common';
import { AmountController } from './presentation/amount.controller';

@Module({
  controllers: [AmountController],
})
export class AmountModule {}
