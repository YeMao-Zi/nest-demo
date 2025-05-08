import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 开启文件上传功能
  app.useStaticAssets('public', { prefix: '/static' });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
