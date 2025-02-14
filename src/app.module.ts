import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from '@root/middlewares/logger.middleware';
import { ConcertModule } from '@app/modules/concert.module';
import { AuthModule } from '@app/modules/auth.module';
import { AmountModule } from '@app/modules/amount.module';
import { PaymentModule } from '@app/modules/payment.module';
import { UserInfoModule } from '@app/modules/userInfo.module';
import { UserWaitQueueModule } from '@app/modules/userWaitQueue.module';
import { DatabaseModule } from '@app/modules/database.module';
import { EventModule } from '@app/modules/event.module';
import { KafkaModule } from '@app/modules/kafka.module';
import { ReservationModule } from '@app/modules/reservation.module';

@Module({
  imports: [
    ConcertModule,
    AuthModule,
    AmountModule,
    PaymentModule,
    UserInfoModule,
    UserWaitQueueModule,
    ReservationModule,
    DatabaseModule,
    EventModule,
    KafkaModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
