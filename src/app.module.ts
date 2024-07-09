import { Module } from '@nestjs/common';
import { ConcertModule } from './model/concert.module';
import { AuthModule } from './model/auth.module';
import { AmountModule } from './model/amount.module';
import { PaymentModule } from './model/payment.module';
import { UserInfoModule } from './model/userInfo.module';

@Module({
  imports: [
    ConcertModule,
    AuthModule,
    AmountModule,
    PaymentModule,
    UserInfoModule,
  ],
})
export class AppModule {}
