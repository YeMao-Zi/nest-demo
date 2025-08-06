import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';

import { AaaModule } from './aaa/aaa.module';

import { AppService } from './app.service';
import { createClient } from 'redis';

@Module({
  imports: [AaaModule],
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
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure() {}
}
