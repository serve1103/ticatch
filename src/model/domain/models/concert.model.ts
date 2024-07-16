export class ConcertModel {
  constructor(
    public name: string,
    public id?: number,
  ) {}
}

export class ConcertOptionsModel {
  constructor(
    public opened_at: Date,
    public closed_at: Date,
    public maxCapacity: number,
    public applyCapacity: number,
    public concertIdx?: number,
  ) {}
}

export class ConcertOptionsRoomModel {
  constructor(
    public concertOptionsIdx: number,
    public roomNumber: number,
    public roomPrice: number,
    public userId: string,
    public state: 'TAKEN' | 'AVAILABLE',
    public id?: number,
  ) {}
}
