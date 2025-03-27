import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { PersonModule } from './person/person.module';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { AppService } from './app.service';
import { CccModule } from './ccc/ccc.module';
import { DddModule } from './ddd/ddd.module';
import { LogMiddleware } from './log.middleware';
import { LoginGuard } from './login.guard';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AaaService } from './aaa/aaa.service';
import { DddService } from './ddd/ddd.service';
import { ErrorTypeFilter } from './test.filter';

@Module({
  imports: [
    PersonModule,
    AaaModule,
    BbbModule.register({ name: 'bbb' }),
    CccModule,
    DddModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // 注册一个全局的过滤器
      provide: APP_FILTER,
      useClass: ErrorTypeFilter,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 启用路由中间件
    consumer.apply(LogMiddleware).forRoutes('aaa');
  }
}
