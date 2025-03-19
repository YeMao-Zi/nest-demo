import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PersonService } from './person/person.service';
import { AppService } from './app.service';
import { DddService } from './ddd/ddd.service';
import { Reflector } from '@nestjs/core';
// 路由守卫
@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(Reflector)
  private readonly reflector: Reflector;

  @Inject(DddService)
  private readonly dddService: DddService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const classMetadata = this.reflector.get<string[]>(
      'roles',
      context.getClass(),
    );
    const methodMetadata = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    console.log(classMetadata, 'classMetadata', methodMetadata);
    console.log('login check', this.dddService.findAll());
    return true;
  }
}
