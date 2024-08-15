import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { ReservationUseCase } from '@app/application/reservation.use-case';
import {
  ReservationModel,
  ReservationStatus,
} from '@app/domain/models/reservation.model';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationUseCase: ReservationUseCase) {}

  // 특정 예약 조회
  @Get(':id')
  async getReservation(@Param('id') id: number): Promise<ReservationModel> {
    return await this.reservationUseCase.executeGetTicket(id);
  }

  // 새로운 예약 생성
  @Post()
  async createReservation(
    @Body() reservationModel: ReservationModel,
  ): Promise<void> {
    await this.reservationUseCase.executeSetTicket(reservationModel);
  }

  // 예약 상태 업데이트
  @Put(':id/status')
  async updateReservationStatus(
    @Param('id') id: number,
    @Body('status') status: ReservationStatus,
  ): Promise<ReservationModel> {
    return await this.reservationUseCase.executeUpdateState(id, status);
  }
}
