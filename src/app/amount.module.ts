import { Module } from '@nestjs/common';
import { AmountController } from './presentation/amount.controller';
import { AmountService } from './domain/services/amount.service';

@Module({
  controllers: [AmountController],
  providers: [AmountService],
})
export class AmountModule {}
