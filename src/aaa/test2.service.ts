import { Injectable } from '@nestjs/common';

@Injectable()
export class Test2Service {
  get(): string {
    return 'Test2Service';
  }
}
