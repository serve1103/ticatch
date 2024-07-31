import { Module } from '@nestjs/common';
import { AuthController } from '@app/presentation/auth.controller';
import { AuthService } from '@app/domain/services/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
