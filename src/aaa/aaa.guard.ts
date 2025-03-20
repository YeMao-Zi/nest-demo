import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AaaGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const classInfo = context.getClass();
    const handler = context.getHandler();
    const roles = this.reflector.get<string[]>('roles', handler);
    console.log(roles, 'roles');
    if (!roles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if(!user) throw new BadRequestException('没有权限');
    return roles.some((role) => user.roles.includes(role));
  }
}
