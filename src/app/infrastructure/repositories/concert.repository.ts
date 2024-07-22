import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { ConcertRepository } from '@app/domain/interfaces/concert.repository.interface';
import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '@app/domain/models/concert.model';
import { Concert } from '@app/infrastructure/entities/concert.entity';
import { ConcertOptions } from '@app/infrastructure/entities/concertOptions.entity';
import { ConcertOptionsRoom } from '@app/infrastructure/entities/concertOptionsRoom.entity';
import {
  ConcertMapper,
  ConcertOptionsMapper,
  ConcertOptionsRoomMapper,
} from '@app/infrastructure/mappers/concert.mapper.e2m';

@Injectable()
export class ConcertRepositoryImpl implements ConcertRepository {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
    @InjectRepository(ConcertOptions)
    private readonly concertOptionsRepository: Repository<ConcertOptions>,
    @InjectRepository(ConcertOptionsRoom)
    private readonly concertOptionsRoomRepository: Repository<ConcertOptionsRoom>,
  ) {}

  async findAllDates(): Promise<string[]> {
    const concerts = await this.concertRepository.find();
    return concerts.map((concert) => concert.date);
  }

  async findSeatsByDate(date: string): Promise<string[]> {
    const concert = await this.concertRepository.findOne({ where: { date } });
    return concert ? concert.seats : [];
  }

  async updateSeats(date: string, seats: string[]): Promise<ConcertModel> {
    const concert = await this.concertRepository.findOne({ where: { date } });
    if (concert) {
      concert.seats = seats;
      return await this.concertRepository.save(ConcertMapper.toEntity(concert));
    }
    throw new Error('Concert not found');
  }
}
