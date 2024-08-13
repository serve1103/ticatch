import { Module } from '@nestjs/common';
import { PaymentController } from '@app/presentation/api/payment.controller';
import { PaymentService } from '@app/domain/services/payment.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
