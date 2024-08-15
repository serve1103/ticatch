import { Inject, Injectable } from '@nestjs/common';
import {
  ReservationModel,
  ReservationStatus,
} from '@app/domain/models/reservation.model';
import {
  ReservationRepository,
  ReservationRepositorySymbol,
} from '@app/domain/interfaces/reservation.repository.interface';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(ReservationRepositorySymbol)
    private readonly reservationRepository: ReservationRepository,
  ) {}

  // 특정 티켓을 조회하여 도메인 모델로 반환
  async getTicket(ticketId: number): Promise<ReservationModel> {
    const reservation = await this.reservationRepository.findById(ticketId);
    return reservation;
  }

  // 새로운 티켓을 생성 및 저장
  async setTicket(reservationModel: ReservationModel): Promise<void> {
    await this.reservationRepository.save(reservationModel, null);
  }

  // 예약 상태를 업데이트하고 업데이트된 도메인 모델을 반환
  async updateState(
    reservationId: number,
    newStatus: ReservationStatus,
  ): Promise<ReservationModel> {
    const reservation =
      await this.reservationRepository.findById(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    // 상태 업데이트
    reservation.status = newStatus;

    // 업데이트된 예약 정보 저장
    const updatedReservation = await this.reservationRepository.save(
      reservation,
      null,
    );

    return updatedReservation;
  }
}
