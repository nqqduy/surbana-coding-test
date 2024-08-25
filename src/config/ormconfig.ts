import { DataSource, DataSourceOptions } from 'typeorm';
import {
  DATABASE_DB_NAME,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from './environment';

module.exports.dataSource = new DataSource({
  type: 'postgres',
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_DB_NAME,
  migrations: ['dist/migrations/*.js'],
  entities: ['dist/modules/**/database/entities/*.js'],
  synchronize: false,
} as DataSourceOptions);
