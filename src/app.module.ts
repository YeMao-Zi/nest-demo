import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';

import { AaaModule } from './aaa/aaa.module';

import { AppService } from './app.service';
import { MyLogger } from './MyLogger';

@Module({
  imports: [AaaModule],
  controllers: [AppController],
  providers: [AppService, MyLogger],
})
export class AppModule implements NestModule {
  configure() {}
}
