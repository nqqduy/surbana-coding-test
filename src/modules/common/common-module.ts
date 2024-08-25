import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database-module';
import { DatabaseService } from './database/services';
import config from 'src/config';
import { DataSourceOptions } from 'typeorm';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      inject: [DatabaseService],
      useFactory: (databaseService: DatabaseService) =>
        databaseService.createOptions(),
      async dataSourceFactory(options?: DataSourceOptions) {
        return DatabaseService.addTransaction(options);
      },
    }),
  ],
  exports: [],
})
export class CommonModule {}
