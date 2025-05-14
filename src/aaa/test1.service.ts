import { Injectable } from '@nestjs/common';
import { Test2Service } from './test2.service';

@Injectable()
export class Test1Service {
  constructor(private readonly test2Service: Test2Service) {}
  get(): string {
    return 'Test1Service';
  }

  get2(): string {
    return 'Test1Service：' + this.test2Service.get();
  }
}
