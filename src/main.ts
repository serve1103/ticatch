import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setSwagger } from './middlewares/swagger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  setSwagger(app);

  await app.listen(3000);
}
bootstrap();
