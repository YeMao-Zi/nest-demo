import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 把 public 目录设置为静态文件目录（http://localhost:3000/static/test.html可访问）
  app.useStaticAssets('public', { prefix: '/static' });
  // 把 uploads 目录设置为静态文件目录（用于上传）
  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
