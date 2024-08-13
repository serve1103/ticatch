import {
  AmountHistoryModel,
  AmountHistoryState,
} from '@app/domain/models/amountHistory.model';
import {
  UserAmountHistory,
  UserAmountHistoryGubun,
} from '@app/infrastructure/db/entities/userAmountHistory.entity';

export class AmountHistoryMapper {
  static toDomain(entity: UserAmountHistory): AmountHistoryModel {
    if (!entity) return null;
    return new AmountHistoryModel(
      entity.userId,
      entity.userAmount,
      mapGubunToState(entity.Gubun),
    );
  }

  static toEntity(domain: AmountHistoryModel): UserAmountHistory {
    const entity = new UserAmountHistory();

    entity.userId = domain.userId;
    entity.userAmount = domain.userAmount;
    entity.Gubun = mapStateToGubun(domain.state);

    return entity;
  }
}

function mapGubunToState(gubun: UserAmountHistoryGubun): AmountHistoryState {
  switch (gubun) {
    case UserAmountHistoryGubun.CHARGE:
      return AmountHistoryState.CHARGE;
    case UserAmountHistoryGubun.USE:
      return AmountHistoryState.USE;
  }
}

function mapStateToGubun(gubun: AmountHistoryState): UserAmountHistoryGubun {
  switch (gubun) {
    case AmountHistoryState.CHARGE:
      return UserAmountHistoryGubun.CHARGE;
    case AmountHistoryState.USE:
      return UserAmountHistoryGubun.USE;
  }
}
