import { Module } from '@nestjs/common';
import { ConcertModule } from './model/concert.module';

@Module({
  imports: [ConcertModule],
})
export class AppModule {}
