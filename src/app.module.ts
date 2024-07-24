import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConcertModule } from '@app/concert.module';
import { AuthModule } from '@app/auth.module';
import { AmountModule } from '@app/amount.module';
import { PaymentModule } from '@app/payment.module';
import { UserInfoModule } from '@app/userInfo.module';
import { DatabaseModule } from '@app/infrastructure/database.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConcertModule,
    AuthModule,
    AmountModule,
    PaymentModule,
    // UserInfoModule,
    DatabaseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
