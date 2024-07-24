export class ConcertModel {
  constructor(
    public id: number,
    public concertName: string,
    public options: ConcertOptionsModel[],
  ) {}
}

export class ConcertOptionsModel {
  constructor(
    public openedAt: Date,
    public closedAt: Date,
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
    public state: ConcertRoomState,
    public id?: number,
  ) {}
}

export enum ConcertRoomState {
  TAKEN = 'TAKEN',
  AVAILABLE = 'AVAILABLE',
}
