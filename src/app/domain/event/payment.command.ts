import { ICommand } from '@nestjs/cqrs';
import { Payment } from '@app/infrastructure/db/entities/payment.entity';

export class PaymentCommand implements ICommand {
  constructor(public readonly payment: Payment) {}
}
