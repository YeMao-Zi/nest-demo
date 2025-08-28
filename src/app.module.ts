import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
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
        entities: [User],
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
    JwtModule.register({
      global: true,
      secret: '123456',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure() {}
}
