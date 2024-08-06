import { Inject, Injectable } from '@nestjs/common';
import {
  ConcertRepository,
  concertRepositorySymbol,
} from '@app/domain/interfaces/concert.repository.interface';
import {
  ConcertModel,
  ConcertOptionsModel,
  ConcertOptionsRoomModel,
} from '@app/domain/models/concert.model';
import {
  ConcertCacheRepository,
  concertCacheRepositorySymbol,
} from '@app/domain/interfaces/concert.cache.repository.interface';

@Injectable()
export class ConcertService {
  constructor(
    @Inject(concertRepositorySymbol)
    private readonly concertRepository: ConcertRepository,
    @Inject(concertCacheRepositorySymbol)
    private readonly concertCacheRepository: ConcertCacheRepository,
  ) {}

  async getConcertAll(concertId?: number): Promise<ConcertModel[]> {
    // 콘서트 ID가 없으면 전체 조회
    if (!concertId)
      return await this.concertRepository.findAllOrConcertId(concertId);

    // 캐시 조회
    const getCache = await this.concertCacheRepository.findById(concertId);

    // 캐시 유 -> 캐시 반환
    if (getCache) return getCache;

    // 캐시 무 -> 데이터 조회 후 캐시 생성
    const concertOptions =
      await this.concertRepository.findAllOrConcertId(concertId);

    await this.concertCacheRepository.setCacheConcert(
      concertId,
      concertOptions,
    );

    // 조회 데이터 반환
    return concertOptions;
  }

  async getAvailableSeats(
    concertOptionsId: number,
  ): Promise<
    { concertOption: ConcertOptionsModel; rooms: ConcertOptionsRoomModel[] }[]
  > {
    return await this.concertRepository.findSeatsByDate(concertOptionsId);
  }
}
