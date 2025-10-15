import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { Permission } from './user/entities/permission.entity';
import { Role } from './user/entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { PermissionGuard } from './guards/permission.guard';
import { AuthModule } from './auth/auth.module';

import * as crypto from 'crypto';
(global as any).crypto = crypto;
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_SERVER_HOST'),
        port: configService.get('MYSQL_SERVER_PORT'),
        username: configService.get('MYSQL_SERVER_USERNAME'),
        password: configService.get('MYSQL_SERVER_PASSWORD'),
        database: configService.get('MYSQL_SERVER_DATABASE'),
        entities: [User, Permission, Role],
        // synchronize: false,
        synchronize: true,
        logging: true,
        // migrations: ['src/migrations/**/*{.ts,.js}'],
        // migrationsTableName: 'typeorm_migrations',
        subscribers: [],
        connectorPackage: 'mysql2',
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: '123456',
      signOptions: { expiresIn: '7d' },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure() {}
}
