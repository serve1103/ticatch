import { Injectable, Logger, NestMiddleware, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('LoggerMiddleware');

  use(@Req() req: Request, @Res() res: Response, next: NextFunction): void {
    // 요청에서 IP, 메서드, URL 추출
    const { ip, method, originalUrl } = req;

    // 요청에서 사용자 에이전트 추출
    const userAgent = req.get('user-agent') || '';

    // 응답이 완료되면 로그를 기록
    res.on('finish', () => {
      const { statusCode } = res;

      // 로그 메시지 구성 및 기록
      this.logger.log(
        `[${method}] {${originalUrl}} ${statusCode} - ${userAgent} { IP: ${ip} }`,
      );
    });

    // 다음 미들웨어로 요청을 넘김
    next();
  }
}
