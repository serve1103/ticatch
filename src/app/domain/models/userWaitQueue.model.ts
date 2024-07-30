export class UserWaitQueueModel {
  constructor(
    public userId: string,
    public state: QueueState,
    public createdAt?: Date,
    public expiredAt?: Date,
    public id?: number,
  ) {}
}

export enum QueueState {
  WAITING = 'WAITING',
  USING = 'USING',
  DONE = 'DONE',
}
