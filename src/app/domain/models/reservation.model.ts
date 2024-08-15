export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export class ReservationModel {
  constructor(
    public id: number,
    public userId: string,
    public concertId: number,
    public concertOptionsId: number,
    public concertOptionsRoomId: number,
    public status: ReservationStatus,
    public version: number,
  ) {}
}
