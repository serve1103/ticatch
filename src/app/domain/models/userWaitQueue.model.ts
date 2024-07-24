export class UserWaitQueueModel {
  userId: string;
  state: QueueState;
  createdAt?: Date;
  expiredAt?: Date;
  id?: number;
}

export enum QueueState {
  WAITING = 'WAITING',
  USING = 'USING',
  DONE = 'DONE',
}
