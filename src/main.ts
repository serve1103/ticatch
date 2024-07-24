import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setSwagger } from './middlewares/swagger.middleware';
import { GlobalExceptionFilter } from '@app/presentation/filter/httpException.filter';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { SuccessInterceptor } from '@app/presentation/interceptor/success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get('Reflector')),
    new SuccessInterceptor(),
  );

  // Swagger 설정
  setSwagger(app);

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(3000);
}
bootstrap();
