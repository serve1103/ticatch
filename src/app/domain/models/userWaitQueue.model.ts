export class UserWaitQueueModel {
  constructor(
    userId: string,
    state: QueueState,
    createdAt?: Date,
    expiredAt?: Date,
    id?: number,
  ) {}
}

export enum QueueState {
  WAITING = 'WAITING',
  USING = 'USING',
  DONE = 'DONE',
}
