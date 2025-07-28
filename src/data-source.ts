import { DataSource } from 'typeorm';
import { Article } from './article/entities/article.entity';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'study',
  entities: [Article],
  migrations: ['src/migrations/**/*{.ts,.js}'], // 迁移文件路径
  synchronize: false,
  logging: true,
  connectorPackage: 'mysql2',
});
