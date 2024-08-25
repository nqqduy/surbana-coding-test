import * as dotenv from 'dotenv';
dotenv.config();

// SERVER
export const HOST = process.env.HOST ?? 'localhost';
export const PORT = process.env.PORT ?? '3000';
export const SERVER_PREFIX = process.env.SERVER_PREFIX ?? 'api';

// DATABASE
export const DATABASE_HOST = process.env.DATABASE_HOST ?? 'localhost';
export const DATABASE_PORT = Number(process.env.DATABASE_PORT) ?? 5432;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME ?? 'surbana';
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? 'password';
export const DATABASE_DB_NAME = process.env.DATABASE_DB_NAME ?? 'surbana';
