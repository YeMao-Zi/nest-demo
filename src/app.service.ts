import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class AppService {
  async getHello() {
    return 'Hello World!';
  }
}
