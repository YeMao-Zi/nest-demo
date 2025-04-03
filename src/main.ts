import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextFunction, Request, Response } from 'express';
import { LoginGuard } from './login.guard';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 开启文件上传功能
  app.useStaticAssets('public', { prefix: '/static' });
  // 开启接口版本功能
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'version',
  });
  // 自定义版本号逻辑
  // const extractor = (req: Request) => {
  //   if (req.headers['disable-custom']) {
  //     return '';
  //   }
  //   return req.url.includes('guang') ? '2' : '1';
  // };
  // app.enableVersioning({
  //   type: VersioningType.CUSTOM,
  //   extractor,
  // });
  // 全局中间件
  // app.use(function (req: Request, res: Response, next: NextFunction) {
  //   console.log('middlewareBefore', req.url);
  //   next();
  //   console.log('middlewareAfter');
  // });
  // 全局路由守卫
  // app.useGlobalGuards(new LoginGuard())
  await app.listen(process.env.PORT ?? 3000);

  // setTimeout(() => {
  //   app.close();
  // }, 3000);
}
bootstrap();
