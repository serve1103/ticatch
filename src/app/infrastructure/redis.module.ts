import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';

export const RedisSymbol = Symbol.for('REDIS_CLIENT');

@Global()
@Module({
  providers: [
    {
      provide: RedisSymbol,
      useFactory: () => {
        return new Redis({
          host: 'localhost',
          port: 6379,
        });
      },
    },
  ],
  exports: [RedisSymbol],
})
export class RedisModule {}
