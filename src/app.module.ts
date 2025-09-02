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
import { LoginGuard } from './guards/login.guard';
import { PermissionGuard } from './guards/permission.guard';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('mysql_server_host'),
        port: configService.get('mysql_server_port'),
        username: configService.get('mysql_server_username'),
        password: configService.get('mysql_server_password'),
        database: configService.get('mysql_server_database'),
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: LoginGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure() {}
}
