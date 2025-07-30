import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AaaModule } from './aaa/aaa.module';
import { AppService } from './app.service';
import { Article } from './article/entities/article.entity';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AaaModule,
    ArticleModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('mysql_server_host'),
        port: configService.get('mysql_server_port'),
        username: configService.get('mysql_server_username'),
        password: configService.get('mysql_server_password'),
        database: configService.get('mysql_server_database'),
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
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure() {}
}
