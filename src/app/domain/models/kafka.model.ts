export class KafkaOutboxModel {
  constructor(
    public topic: string,
    public key: string,
    public message: string,
    public status: MessageState,
  ) {}
}

export enum MessageState {
  INIT = 'INIT',
  PUBLISHED = 'PUBLISHED',
}
