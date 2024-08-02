import { Inject, Injectable } from '@nestjs/common';
import { ConcertCacheRepository } from '@app/domain/interfaces/concert.cache.repository.interface';
import { RedisSymbol } from '@app/infrastructure/redis.module';
import { Redis } from 'ioredis';
import { ConcertModel } from '@app/domain/models/concert.model';

@Injectable()
export class ConcertCacheRepositoryImpl implements ConcertCacheRepository {
  constructor(
    @Inject(RedisSymbol)
    private readonly redis: Redis,
  ) {}

  async findById(concertId: number): Promise<ConcertModel[]> {
    const getCache = await this.redis.get(`options-${concertId}`);

    if (!getCache) return null;

    return JSON.parse(getCache);
  }

  async setCacheConcert(concertId: number, concertModels: ConcertModel[]) {
    this.redis.set(
      `options-${concertId}`,
      JSON.stringify(concertModels),
      'PX',
      360,
      'NX',
    );
  }
}
