import { Inject, Injectable } from '@nestjs/common';
import {
  AmountRepository,
  amountRepositorySymbol,
} from '@app/domain/interfaces/amount.repsitory.interface';

@Injectable()
export class AmountService {
  constructor(
    @Inject(amountRepositorySymbol)
    private readonly amountRepository: AmountRepository,
  ) {}
  async getUserAmount() {}
}
