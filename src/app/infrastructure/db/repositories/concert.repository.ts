import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { ConcertRepository } from '@app/domain/interfaces/concert.repository.interface';
import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '@app/domain/models/concert.model';
import { Concert } from '@app/infrastructure/db/entities/concert.entity';
import { ConcertOptions } from '@app/infrastructure/db/entities/concertOptions.entity';
import { ConcertOptionsRoom } from '@app/infrastructure/db/entities/concertOptionsRoom.entity';
import {
  ConcertMapper,
  ConcertOptionsMapper,
  ConcertOptionsRoomMapper,
} from '@app/infrastructure/db/mappers/concert.mapper.e2m';

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

  // 콘서트 전체 조회
  async findAllOrConcertId(concertId?: number): Promise<ConcertModel[]> {
    let concerts: Concert[] = [];
    if (!concertId) {
      // 모든 콘서트를 조회
      concerts = await this.concertRepository.find();
    } else {
      concerts = await this.concertRepository.find({
        where: { id: concertId },
      });
    }

    const concertIds = concerts.map((concert) => concert.id);

    // 각 콘서트의 옵션을 조회하고 매핑
    const queryBuilder =
      await this.concertOptionsRepository.createQueryBuilder('CD');

    const concertOptions = await queryBuilder
      .select([
        'CD.concertIdx',
        'CD.concertOpenedDate',
        'CD.concertClosedDate',
        'CD.concertMaxCapacity',
        'CD.concertApplyCapacity',
      ])
      .where('CD.concertIdx IN (:...idx)', { idx: concertIds }) // `IN (:...idx)` 형식으로 수정하여 배열을 처리합니다.
      .getMany();

    // 콘서트와 옵션을 매핑
    const concertModels = concerts.map((concert) => {
      const options = concertOptions.filter(
        (option) => option.concertIdx === concert.id,
      );
      return ConcertMapper.toDomain(concert, options);
    });

    return concertModels;
  }

  // async findAllOrConcertId(concertId?: number): Promise<ConcertModel[]> {
  //   console.time('ConcertFindTime');
  //   const today = new Date();
  //   const queryBuilder = this.concertOptionsRepository
  //     .createQueryBuilder('concert')
  //     .innerJoinAndSelect(
  //       'ConcertOptions',
  //       'options',
  //       'concert.id = options.concertIdx',
  //     )
  //     .where('options.concertOpenedDate >= :date', { date: today });

  //   if (concertId) {
  //     queryBuilder.andWhere('concert.id = :concertId', { concertId });
  //   }

  //   const concerts = await queryBuilder.getMany();

  //   console.log(concerts);

  //   // 콘서트와 옵션을 매핑
  //   const concertModels = concerts.map((concert) => {
  //     const options = concert['options'];
  //     return ConcertMapper.toDomain(concert, options);
  //   });

  //   console.timeEnd('ConcertFindTime');
  //   return concertModels;
  // }

  // 특정 콘서트 조회
  async findSeatsByDate(
    concertOptionsId: number,
  ): Promise<
    { concertOption: ConcertOptionsModel; rooms: ConcertOptionsRoomModel[] }[]
  > {
    console.time('seatTime');
    // 오늘 날짜 불러오기
    const today = new Date();

    // 해당 콘서트와 오늘 날짜 이후의 옵션 조회
    const concertOptions = await this.concertOptionsRepository.find({
      where: {
        idx: concertOptionsId,
        concertOpenedDate: MoreThan(today),
      },
    });

    if (!concertOptions || concertOptions.length === 0) {
      throw new Error('Concert options not found for the given date');
    }

    // 각 콘서트 옵션에 대한 좌석 정보 조회 및 매핑
    const result = await Promise.all(
      concertOptions.map(async (option) => {
        const rooms = await this.concertOptionsRoomRepository.find({
          where: { concertOptionsId: option.idx },
        });
        const mappedRooms = rooms.map((room) =>
          ConcertOptionsMapper.toOptionsRoomModel(room),
        );
        return {
          concertOption: ConcertOptionsMapper.toOptionsModel(option),
          rooms: mappedRooms,
        };
      }),
    );
    console.timeEnd('seatTime');
    return result;
  }
}
