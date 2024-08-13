import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmountController } from '@app/presentation/api/amount.controller';
import { AmountService } from '@app/domain/services/amount.service';
import { UserAmountUseCase } from '@app/application/amount.use-case';
import { AmountRepositoryImpl } from '@app/infrastructure/repositories/amount.repository';
import { amountRepositorySymbol } from '@app/domain/interfaces/amount.repsitory.interface';
import { AmountHistoryService } from '@app/domain/services/amountHistory.service';
import { amountHistoryRepositorySymbol } from '@app/domain/interfaces/amountHistory.repository.interface';
import { AmountHistoryRepositoryimpl } from '@app/infrastructure/repositories/amountHistory.repository';
import { UserAmount } from '@app/infrastructure/entities/userAmount.entity';
import { UserAmountHistory } from '@app/infrastructure/entities/userAmountHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAmount, UserAmountHistory])],
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
