import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

// 自定义一个 ErrorTypeException 异常
export class ErrorTypeException {
  message: string;
  constructor(message?: string) {
    console.log('ErrorTypeException', message);
    message && (this.message = message);
  }
}
@Catch(ErrorTypeException)
export class ErrorTypeFilter implements ExceptionFilter {
  catch(exception: ErrorTypeException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: 'fail',
      error: exception.message || '用户未登录',
    });
  }
}

// TestFilter 会捕获 HttpException 异常
@Catch(HttpException)
export class TestFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const res = exception.getResponse() as any;
    const statusCode = exception.getStatus();
    response.status(statusCode).json({
      code: statusCode,
      message: res?.message?.join ? res?.message?.join(',') : exception.message,
      error: 'Bad Request',
    });
  }
}
