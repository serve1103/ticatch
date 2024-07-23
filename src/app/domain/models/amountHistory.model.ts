export enum AmountHistoryState {
  CHARGE = 'CHARGE',
  USE = 'USE',
}

export class AmountHistoryModel {
  constructor(
    public userId: string,
    public userAmount: number,
    public state: AmountHistoryState,
  ) {}
}
