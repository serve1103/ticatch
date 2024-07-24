import { AmountModel } from '@app/domain/models/amount.model';
import { UserAmount } from '@app/infrastructure/entities/userAmount.entity';

export class AmountMapper {
  static toDomain(entity: UserAmount): AmountModel {
    if (!entity) return null;

    return new AmountModel(entity.userId, entity.userAmount);
  }

  static toEntity(domain: AmountModel): UserAmount {
    const entity = new UserAmount();

    entity.userId = domain.userId;
    entity.userAmount = domain.userAmount;

    return entity;
  }
}
