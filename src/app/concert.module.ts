import { Module } from '@nestjs/common';
import { ConcertController } from './presentation/concert.controller';
import { ConcertService } from './domain/services/concert.service';
import { ConcertUseCase } from './application/concert.use-case';
import { concertRepositorySymbol } from './domain/interfaces/concert.repository.interface';
import { ConcertRepositoryImpl } from './infrastructure/repositories/concert.repository';

@Module({
  controllers: [ConcertController],
  providers: [
    ConcertService,
    ConcertUseCase,
    {
      provide: concertRepositorySymbol,
      useClass: ConcertRepositoryImpl,
    },
  ],
})
export class ConcertModule {}
