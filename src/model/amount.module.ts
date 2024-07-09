import { Module } from '@nestjs/common';
import { AmountController } from './presentation/amount.controller';
import { AmountService } from './domain/amount.service';

@Module({
  controllers: [AmountController],
  providers: [AmountService],
})
export class AmountModule {}
