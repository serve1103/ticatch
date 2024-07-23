import { Module } from '@nestjs/common';
import { ConcertModule } from '@app/concert.module';
import { AuthModule } from '@app/auth.module';
import { AmountModule } from '@app/amount.module';
import { PaymentModule } from '@app/payment.module';
import { UserInfoModule } from '@app/userInfo.module';
import { DatabaseModule } from '@app/infrastructure/database.module';

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
