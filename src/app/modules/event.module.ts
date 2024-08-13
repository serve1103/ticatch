import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PaymentHandler } from '@app/domain/event/payment.handler';

@Module({
  imports: [CqrsModule],
  providers: [PaymentHandler],
  exports: [CqrsModule],
})
export class EventModule {}
