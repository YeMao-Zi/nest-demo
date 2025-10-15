import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Permission } from './user/entities/permission.entity';
import { Role } from './user/entities/role.entity';
import { ConfigService } from '@nestjs/config';

// 使用 ConfigService
const configService = new ConfigService();
const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: configService.get('MYSQL_SERVER_HOST') || 'localhost',
  port: configService.get('MYSQL_SERVER_PORT') || 3306,
  username: configService.get('MYSQL_SERVER_USERNAME') || 'root',
  password: configService.get('MYSQL_SERVER_PASSWORD') || '123456',
  database: configService.get('MYSQL_SERVER_DATABASE') || 'study',
  entities: [User, Permission, Role],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  connectorPackage: 'mysql2',
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
