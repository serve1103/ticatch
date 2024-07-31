import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from '@root/middlewares/logger.middleware';
import { ConcertModule } from '@app/concert.module';
import { AuthModule } from '@app/auth.module';
import { AmountModule } from '@app/amount.module';
import { PaymentModule } from '@app/payment.module';
import { UserInfoModule } from '@app/userInfo.module';
import { UserWaitQueueModule } from '@app/userWaitQueue.module';
import { DatabaseModule } from '@app/infrastructure/database.module';

@Module({
  imports: [
    ConcertModule,
    AuthModule,
    AmountModule,
    PaymentModule,
    UserInfoModule,
    UserWaitQueueModule,
    DatabaseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
