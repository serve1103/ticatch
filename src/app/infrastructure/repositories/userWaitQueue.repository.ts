import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWaitQueueRepository } from '@app/domain/interfaces/userWaitQueue.repository.interface';
import { UserWaitQueue } from '@app/infrastructure/entities/userWaitQueue.entity';
import { UserWaitQueueModel } from '@app/domain/models/userWaitQueue.model';
import { InfrastructureMapper } from '@app/infrastructure/mappers/userWaitQueue.mapper';

@Injectable()
export class UserWaitQueueRepositoryImpl implements UserWaitQueueRepository {
  constructor(
    @InjectRepository(UserWaitQueue)
    private readonly userWaitQueueRepository: Repository<UserWaitQueue>,
  ) {}

  async save(
    userWaitQueue: UserWaitQueueModel,
    entityManager?: EntityManager,
  ): Promise<UserWaitQueueModel> {
    const manager = entityManager ?? this.userWaitQueueRepository.manager;
    const entity = InfrastructureMapper.toEntity(userWaitQueue);
    const savedEntity = await manager.save(entity);
    return InfrastructureMapper.toDomain(savedEntity);
  }

  async findByUserId(userId: string): Promise<UserWaitQueueModel> {
    const entity = await this.userWaitQueueRepository.findOne({
      where: { userId },
    });

    return InfrastructureMapper.toDomain(entity);
  }

  async findAll(): Promise<UserWaitQueueModel[]> {
    const entity = await this.userWaitQueueRepository.find();

    return entity.map((item) => InfrastructureMapper.toDomain(item));
  }
}
