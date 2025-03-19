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
// 路由守卫
@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(DddService)
  private readonly dddService: DddService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(context, 'login check', this.dddService.findAll());
    return false;
  }
}
