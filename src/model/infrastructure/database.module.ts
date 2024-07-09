import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql', // 데이터베이스 유형
      host: 'localhost', // 데이터베이스 호스트
      port: 1433, // 데이터베이스 포트
      username: 'SA', // 데이터베이스 사용자 이름
      password: 'A!123456789', // 데이터베이스 비밀번호
      database: 'nestApp', // 데이터베이스 이름
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 엔터티 경로
      synchronize: true, // 개발 환경에서만 사용. 프로덕션 환경에서는 false로 설정
      extra: {
        trustServerCertificate: true,
      },
    }),
  ],
})
export class DatabaseModule {}
