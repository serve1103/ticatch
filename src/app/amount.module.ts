import { Module } from '@nestjs/common';
import { AmountController } from '@app/presentation/amount.controller';
import { AmountService } from '@app/domain/services/amount.service';
import { UserAmountUseCase } from '@app/application/amount.use-case';
import { AmountRepositoryImpl } from '@app/infrastructure/repositories/amount.repository';
import { amountRepositorySymbol } from '@app/domain/interfaces/amount.repsitory.interface';
import { AmountHistoryService } from './domain/services/amountHistory.service';
import { amountHistoryRepositorySymbol } from './domain/interfaces/amountHistory.repository.interface';
import { AmountHistoryRepositoryimpl } from './infrastructure/repositories/amountHistory.repository';

@Module({
  controllers: [AmountController],
  providers: [
    AmountService,
    AmountHistoryService,
    UserAmountUseCase,
    {
      provide: amountRepositorySymbol,
      useClass: AmountRepositoryImpl,
    },
    {
      provide: amountHistoryRepositorySymbol,
      useClass: AmountHistoryRepositoryimpl,
    },
  ],
})
export class AmountModule {}
