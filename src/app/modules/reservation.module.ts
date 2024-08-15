import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationUseCase } from '@app/application/reservation.use-case';
import { ReservationRepositorySymbol } from '@app/domain/interfaces/reservation.repository.interface';
import { ReservationService } from '@app/domain/services/reservation.service';
import { Reservation } from '@app/infrastructure/db/entities/reservation.entity';
import { ReservationRepositoryImpl } from '@app/infrastructure/db/repositories/reservation.repository';
import { ReservationController } from '@app/presentation/api/reservation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]), // Reservation 엔티티를 등록
  ],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    ReservationUseCase,
    {
      provide: ReservationRepositorySymbol, // DI를 위한 토큰 제공
      useClass: ReservationRepositoryImpl,
    },
  ],
})
export class ReservationModule {}
