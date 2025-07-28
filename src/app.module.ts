import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AaaModule } from './aaa/aaa.module';
import { AppService } from './app.service';
import { Article } from './article/entities/article.entity';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    AaaModule,
    ArticleModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'study',
      entities: [Article],
      synchronize: false,
      logging: true,
      migrations: ['./src/migration/**.ts'],
      migrationsTableName: 'typeorm_migrations',
      subscribers: [],
      connectorPackage: 'mysql2',
      // extra: {
      //   authPlugin: 'sha256_password',
      // },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure() {}
}
