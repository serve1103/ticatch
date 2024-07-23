import { EntityManager } from 'typeorm';
import { AmountModel } from '../models/amount.model';

export const amountRepositorySymbol = Symbol.for('AmountRepository');

export interface AmountRepository {
  save(
    amountModel: AmountModel,
    entityManager?: EntityManager,
  ): Promise<AmountModel>;
  findByUserId(userId: string): Promise<AmountModel>;
}
