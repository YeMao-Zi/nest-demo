import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { PersonService } from './person/person.service';
// 中间件
@Injectable()
export class LogMiddleware implements NestMiddleware {

  constructor(private readonly personService: PersonService) { }
  use(req: Request, res: Response, next: () => void) {
    console.log('before2', req.url,this.personService.findAll());
    next();
    console.log('after2', req.url);
  }
}
