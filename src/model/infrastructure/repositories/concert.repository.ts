import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { ConcertRepository } from 'src/model/domain/interfaces/concert.repository.interface';
import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from 'src/model/domain/models/concert.model';
import { Concert } from 'src/model/infrastructure/entities/concert.entity';
import { ConcertOptions } from 'src/model/infrastructure/entities/concertOptions.entity';
import { ConcertOptionsRoom } from 'src/model/infrastructure/entities/concertOptionsRoom.entity';
import {
  ConcertMapper,
  ConcertOptionsMapper,
} from 'src/model/infrastructure/mappers/concert.mapper.e2m';

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

  async findByAll(): Promise<ConcertModel[]> {
    const getConcert = await this.concertRepository.find();

    if (!getConcert) throw new Error('콘서트를 찾을 수 없습니다.');

    return getConcert.map((item) => ConcertMapper.toDomain(item));
  }

  async saveConcert(concertModel: ConcertModel): Promise<ConcertModel> {
    const concertData = await this.concertRepository.create(
      ConcertMapper.toEntity(concertModel),
    );
    const savedConcert = await this.concertRepository.save(concertData);

    return ConcertMapper.toDomain(savedConcert);
  }

  async delConcert(concertId: number): Promise<object> {
    return await this.concertRepository.delete(concertId);
  }

  async findByConcertOptionsId(
    concertId: number,
  ): Promise<ConcertOptionsModel[]> {
    // 현재 시점
    const nowDate = new Date();

    const getConcertDetail = await this.concertOptionsRepository.find({
      where: {
        concertIdx: concertId,
        concertOpenedDate: LessThan(nowDate),
        concertClosedDate: MoreThan(nowDate),
      },
    });

    if (!getConcertDetail)
      throw new Error('콘서트 세부내역을 찾을 수 없습니다.');

    return getConcertDetail.map((item) => ConcertOptionsMapper.toDomain(item));
  }

  async saveConcertOptions(
    concertOptionsModel: ConcertOptionsModel,
  ): Promise<ConcertOptionsModel> {
    const concertDetailData = await this.concertOptionsRepository.create(
      ConcertOptionsMapper.toEntity(concertOptionsModel),
    );

    const savedConcertDetail =
      await this.concertOptionsRepository.save(concertDetailData);

    return ConcertOptionsMapper.toDomain(savedConcertDetail);
  }

  async delConcertOptions(concertOptionsId: number): Promise<object> {
    return await this.concertOptionsRepository.delete(concertOptionsId);
  }

  async findByConcertOptionsRoomId(
    concertOptionsId: number,
  ): Promise<ConcertOptionsRoomModel> {
    return;
  }

  async saveConcertOptionsRoom(
    concertOptionsRoomModel: ConcertOptionsRoomModel,
  ): Promise<ConcertOptionsRoomModel> {
    return;
  }

  async delConcertOptionsRoom(concertOptionsId: number): Promise<object> {
    return;
  }
}
