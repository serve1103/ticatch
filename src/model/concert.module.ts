import { Module } from '@nestjs/common';
import { ConcertController } from './presentation/concert.controller';
import { ConcertService } from './domain/services/concert.service';

@Module({
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule {}
