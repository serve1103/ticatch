import { Module } from '@nestjs/common';
import { ConcertController } from './presentation/concert.controller';

@Module({
  controllers: [ConcertController],
})
export class ConcertModule {}
