import { Module } from '@nestjs/common';
import { ConcertController } from '@app/presentation/api/concert.controller';
import { ConcertService } from '@app/domain/services/concert.service';
import { ConcertUseCase } from '@app/application/concert.use-case';
import { concertRepositorySymbol } from '@app/domain/interfaces/concert.repository.interface';
import { ConcertRepositoryImpl } from '@app/infrastructure/db/repositories/concert.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from '@app/infrastructure/db/entities/concert.entity';
import { ConcertOptions } from '@app/infrastructure/db/entities/concertOptions.entity';
import { ConcertOptionsRoom } from '@app/infrastructure/db/entities/concertOptionsRoom.entity';
import { concertCacheRepositorySymbol } from '@app/domain/interfaces/concert.cache.repository.interface';
import { ConcertCacheRepositoryImpl } from '@app/infrastructure/db/repositories/concert.cache.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Concert, ConcertOptions, ConcertOptionsRoom]),
  ],
  controllers: [ConcertController],
  providers: [
    ConcertService,
    ConcertUseCase,
    {
      provide: concertRepositorySymbol,
      useClass: ConcertRepositoryImpl,
    },
    {
      provide: concertCacheRepositorySymbol,
      useClass: ConcertCacheRepositoryImpl,
    },
  ],
})
export class ConcertModule {}
