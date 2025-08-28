import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

// 使用 ConfigService
const configService = new ConfigService();
const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: configService.get('mysql_server_host') || 'localhost',
  port: configService.get('mysql_server_port') || 3306,
  username: configService.get('mysql_server_username') || 'root',
  password: configService.get('mysql_server_password') || '123456',
  database: configService.get('mysql_server_database') || 'study',
  entities: [User],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  connectorPackage: 'mysql2',
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
