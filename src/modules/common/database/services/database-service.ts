import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Injectable()
export class DatabaseService {
  constructor(private readonly configService: ConfigService) {}

  createOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: Number(this.configService.get<string>('database.port')),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      entities: ['dist/modules/**/entities/*.js'],
      synchronize: false,
      logging: true,
    };
  }

  static addTransaction(options: DataSourceOptions) {
    if (!options) {
      throw new Error('Invalid options passed');
    }

    return addTransactionalDataSource(new DataSource(options));
  }
}
