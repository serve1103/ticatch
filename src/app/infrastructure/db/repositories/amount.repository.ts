import { AmountRepository } from '@app/domain/interfaces/amount.repsitory.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAmount } from '@app/infrastructure/db/entities/userAmount.entity';
import { EntityManager, Repository } from 'typeorm';
import { AmountModel } from '@app/domain/models/amount.model';
import { AmountMapper } from '@app/infrastructure/db/mappers/amount.mapper.e2m';

@Injectable()
export class AmountRepositoryImpl implements AmountRepository {
  constructor(
    @InjectRepository(UserAmount)
    private readonly amountRepository: Repository<UserAmount>,
  ) {}

  async findByUserId(userId: string): Promise<AmountModel> {
    const userInfo = await this.amountRepository.findOne({ where: { userId } });

    return AmountMapper.toDomain(userInfo);
  }

  async save(
    amountModel: AmountModel,
    entityManager: EntityManager,
  ): Promise<AmountModel> {
    const manager = entityManager ?? this.amountRepository.manager;

    await manager.update(
      UserAmount,
      {
        userId: amountModel.userId,
      },
      {
        userAmount: amountModel.userAmount,
      },
    );

    const entity = await this.amountRepository.findOne({
      where: { userId: amountModel.userId },
    });

    return AmountMapper.toDomain(entity);
  }
}
