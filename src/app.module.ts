import { Module } from '@nestjs/common';
import { ConcertModule } from './model/concert.module';
import { AuthModule } from './model/auth.module';
import { ChargeAmountModule } from './model/chargeAmount.module';
import { PaymentModule } from './model/payment.module';
import { UserInfoModule } from './model/userInfo.module';

@Module({
  imports: [
    ConcertModule,
    AuthModule,
    ChargeAmountModule,
    PaymentModule,
    UserInfoModule,
  ],
})
export class AppModule {}
