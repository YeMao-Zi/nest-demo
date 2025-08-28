import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

interface RequestWithUser extends Request {
  user?: {
    id: string;
    userName: string;
  };
}

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  private logger = new Logger();
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization || '';
    const [, token] = authorization.split(' ');

    if (!token) {
      throw new HttpException('没有权限', HttpStatus.UNAUTHORIZED);
    }
    try {
      const info = this.jwtService.verify<{ id: string; userName: string }>(
        token,
      );
      request.user = info;
      return true;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        '登录 token 失效，请重新登录',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
