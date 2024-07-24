import { AmountHistoryRepository } from '@app/domain/interfaces/amountHistory.repository.interface';
import { AmountHistoryModel } from '@app/domain/models/amountHistory.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAmountHistory } from '@app/infrastructure/entities/userAmountHistory.entity';
import { Repository } from 'typeorm';
import { AmountHistoryMapper } from '@app/infrastructure/mappers/amountHistory.mapper.e2m';

export class AmountHistoryRepositoryimpl implements AmountHistoryRepository {
  constructor(
    @InjectRepository(UserAmountHistory)
    private readonly amountHistoryRepository: Repository<UserAmountHistory>,
  ) {}

  async findByUserId(userId: string): Promise<AmountHistoryModel[]> {
    const userAmountHistory = await this.amountHistoryRepository.find({
      where: { userId },
    });
    return userAmountHistory.map((item) => AmountHistoryMapper.toDomain(item));
  }

  async save(amountModel: AmountHistoryModel): Promise<AmountHistoryModel> {
    const savedHistory = await this.amountHistoryRepository.save(amountModel);

    return savedHistory;
  }
}
