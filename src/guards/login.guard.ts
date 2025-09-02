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
import { Request } from 'express';
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

    const authorization = request.headers.authorization || '';
    const [, token] = authorization.split(' ');

    if (!token) {
      throw new HttpException('没有权限', HttpStatus.UNAUTHORIZED);
    }
    try {
      const info = this.jwtService.verify<JwtPayload>(token);
      request.user = info.user;
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
