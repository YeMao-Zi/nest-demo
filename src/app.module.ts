import { Global, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';

import { AaaModule } from './aaa/aaa.module';

import { AppService } from './app.service';
import { createClient } from 'redis';
import { RedisModule } from './redis/redis.module';

@Global()
@Module({
  imports: [AaaModule, RedisModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
          // database: 2
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class AppModule implements NestModule {
  configure() {}
}
