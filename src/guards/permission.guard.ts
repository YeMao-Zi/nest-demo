import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Permission } from 'src/user/entities/permission.entity';
import { Role } from 'src/user/entities/role.entity';
import { UserService } from 'src/user/user.service';

interface User {
  id: string;
  userName: string;
  roles: Role[];
}
interface RequestWithUser extends Request {
  user?: User;
}

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(Reflector)
  private readonly reflector: Reflector;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    const request: RequestWithUser = context.switchToHttp().getRequest();

    if (!request.user) {
      return true;
    }

    const roles = await this.userService.findRolesByIds(
      request.user.roles.map((item) => item.id),
    );

    const permissions = roles.reduce((acc: Permission[], cur) => {
      acc.push(...cur.permissions);
      return acc;
    }, []);

    const hasPermission = requiredPermissions.some((permission) =>
      permissions.find((item) => item.name === permission),
    );
    if (!hasPermission) {
      throw new HttpException('没有权限', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
