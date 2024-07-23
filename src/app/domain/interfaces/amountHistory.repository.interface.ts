import { AmountHistoryModel } from '@app/domain/models/amountHistory.model';

export const amountHistoryRepositorySymbol = Symbol.for(
  'AmountHistoryRepository',
);

export interface AmountHistoryRepository {
  save(amountModel: AmountHistoryModel): Promise<AmountHistoryModel>;
  findByUserId(userId: string): Promise<AmountHistoryModel[]>;
}
