import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public', { prefix: '/static' });
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('middlewareBefore', req.url);
    next();
    console.log('middlewareAfter');
  });
  await app.listen(process.env.PORT ?? 3000);

  // setTimeout(() => {
  //   app.close();
  // }, 3000);
}

bootstrap();
