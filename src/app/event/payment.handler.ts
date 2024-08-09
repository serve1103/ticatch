import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PaymentCommand } from '@app/event/payment.command';

@CommandHandler(PaymentCommand)
export class PaymentHandler implements ICommandHandler<PaymentCommand> {
  async execute(command: PaymentCommand): Promise<void> {
    // 외부 API 호출이 있었다고 가정
    console.log('External API call simulation...');

    // 2초 지연
    await this.delay(2000);

    // 이후 작업 수행
    console.log('Continuing after 2 seconds delay...');
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
