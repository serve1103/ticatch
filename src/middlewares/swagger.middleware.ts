import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Swagger 설정을 초기화하는 함수
 * @param {INestApplication} app - NestJS 애플리케이션 인스턴스
 */
export function setSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('콘서트 예약 서비스 ticatch')
    .setDescription('티켓팅 놓치지 마세요.')
    .setVersion('1.0')
    .addTag('ticatch') // 태그 추가
    .build();

  const document = SwaggerModule.createDocument(app, options); // Swagger 문서 생성
  SwaggerModule.setup('ticatch-api', app, document); // Swagger 엔드포인트 설정
}
