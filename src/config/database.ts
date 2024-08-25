import { registerAs } from '@nestjs/config';
import {
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_DB_NAME,
  DATABASE_USERNAME,
} from './environment';

export default registerAs('database', () => ({
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_DB_NAME,
}));
