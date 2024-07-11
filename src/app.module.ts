import { Module } from '@nestjs/common';
import { ConcertModule } from './model/concert.module';
import { AuthModule } from './model/auth.module';
import { AmountModule } from './model/amount.module';
import { PaymentModule } from './model/payment.module';
import { UserInfoModule } from './model/userInfo.module';
import { DatabaseModule } from './model/infrastructure/database.module';

@Module({
  imports: [
    ConcertModule,
    AuthModule,
    AmountModule,
    PaymentModule,
    UserInfoModule,
    DatabaseModule,
  ],
})
export class AppModule {}
