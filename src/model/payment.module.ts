import { Module } from '@nestjs/common';
import { PaymentController } from './presentation/payment.controller';

@Module({
  controllers: [PaymentController]
})
export class PaymentModule {}
