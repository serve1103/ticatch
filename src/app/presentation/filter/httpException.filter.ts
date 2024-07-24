import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch() // 모든 예외를 캐치하는 글로벌 예외 필터
export class GlobalExceptionFilter implements ExceptionFilter {
  // 예외를 처리하는 메소드
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // HTTP 요청과 응답에 접근하기 위한 컨텍스트를 가져옴
    const response = ctx.getResponse<Response>(); // 응답 객체를 가져옴
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR; // 기본 상태 코드는 내부 서버 오류
    let message = ''; // 오류 메시지 초기화

    // HttpException 인스턴스인 경우 처리
    if (exception instanceof HttpException) {
      status = exception.getStatus(); // HttpException의 상태 코드를 가져옴
      message = exception.getResponse()['message'] || ''; // 오류 메시지 설정
    }

    // 오류 응답 보내기
    response.status(status).json({
      success: false, // 성공 여부
      response: {
        statusCode: status, // 상태 코드
        message: message || exception['message'] || '', // 오류 메시지
        error: exception['name'] || '', // 예외 이름
        path: request.url,
      },
    });
  }
}
