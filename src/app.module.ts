import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';

import { AaaModule } from './aaa/aaa.module';

import { AppService } from './app.service';

@Module({
  imports: [AaaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure() {}
}
