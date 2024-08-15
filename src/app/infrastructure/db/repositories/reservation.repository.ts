import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { ReservationRepository } from '@app/domain/interfaces/reservation.repository.interface';
import { ReservationModel } from '@app/domain/models/reservation.model';
import { Reservation } from '@app/infrastructure/db/entities/reservation.entity';
import { ReservationMapper } from '@app/infrastructure/db/mappers/reservation.mapper';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservationRepositoryImpl implements ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async save(
    reservationModel: ReservationModel,
    entityManager: EntityManager,
  ): Promise<ReservationModel> {
    const entity = entityManager ?? this.reservationRepository.manager;

    const savedEntity = await entity.save(Reservation, reservationModel);

    return savedEntity;
  }

  async findById(reservationId: number): Promise<ReservationModel> {
    const findEntity = await this.reservationRepository
      .createQueryBuilder('Reservation')
      .where('R.reservationId = :reservationId', { reservationId })
      .getOne();
    return ReservationMapper.toDomain(findEntity);
  }
}
