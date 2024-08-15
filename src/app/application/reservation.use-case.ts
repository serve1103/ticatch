import { Injectable, Inject } from '@nestjs/common';
import {
  ReservationModel,
  ReservationStatus,
} from '@app/domain/models/reservation.model';
import {
  ReservationRepository,
  ReservationRepositorySymbol,
} from '@app/domain/interfaces/reservation.repository.interface';

@Injectable()
export class ReservationUseCase {
  constructor(
    @Inject(ReservationRepositorySymbol)
    private readonly reservationRepository: ReservationRepository,
  ) {}

  /**
   * 티켓 조회
   * @param ticketId 티켓 ID
   * @returns ReservationModel
   */
  async executeGetTicket(ticketId: number): Promise<ReservationModel> {
    return await this.reservationRepository.findById(ticketId);
  }

  /**
   * 새로운 티켓 생성 및 저장
   * @param reservationModel ReservationModel
   */
  async executeSetTicket(reservationModel: ReservationModel): Promise<void> {
    await this.reservationRepository.save(reservationModel, null);
  }

  /**
   * 예약 상태 업데이트
   * @param reservationId 예약 ID
   * @param newStatus 새로운 예약 상태
   * @returns 업데이트된 ReservationModel
   */
  async executeUpdateState(
    reservationId: number,
    newStatus: ReservationStatus,
  ): Promise<ReservationModel> {
    const reservation =
      await this.reservationRepository.findById(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    reservation.status = newStatus;

    return await this.reservationRepository.save(reservation, null);
  }
}
