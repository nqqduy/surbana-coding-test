import { Module } from '@nestjs/common';
import {
  CreateLocationUseCase,
  DeleteLocationUseCase,
  UpdateLocationUseCase,
} from './domain/use-case';
import { LocationRepositoryAbstract } from './database/repositories/abstracts';
import { LocationRepositoryImpl } from './database/repositories/implements';

@Module({
  controllers: [],
  providers: [
    // USE CASE
    CreateLocationUseCase,
    UpdateLocationUseCase,
    DeleteLocationUseCase,

    // REPOSITORY
    {
      provide: LocationRepositoryAbstract,
      useClass: LocationRepositoryImpl,
    },
  ],
})
export class LocationModule {}
