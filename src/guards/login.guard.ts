import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { Role } from 'src/user/entities/role.entity';

interface User {
  id: string;
  userName: string;
  roles: Role[];
}
interface JwtPayload {
  user: User;
  iat: number;
  exp: number;
}

interface RequestWithUser extends Request {
  user?: User;
}

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  private logger = new Logger();
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isRequireLogin = this.reflector.get<boolean>(
      'require-login',
      context.getHandler(),
    );

    if (!isRequireLogin) {
      return true;
    }
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const authorization = request.headers.authorization || '';
    const [, token] = authorization.split(' ');
    if (!token) {
      throw new HttpException('身份失效', HttpStatus.UNAUTHORIZED);
    }
    try {
      const info = this.jwtService.verify<JwtPayload>(token);
      request.user = info.user;

      // 检查token是否即将过期（剩余时间少于1小时）
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiration = info.exp - currentTime;

      // 如果token即将过期（剩余时间少于1小时），生成新的token
      if (timeUntilExpiration < 3600) {
        const newToken = this.jwtService.sign(
          {
            user: info.user,
          },
          {
            expiresIn: '7d',
          },
        );
        response.setHeader('new-token', newToken);
      }
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
