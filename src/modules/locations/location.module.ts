import { Module } from '@nestjs/common';
import {
  CreateLocationUseCase,
  DeleteLocationUseCase,
  UpdateLocationUseCase,
} from './domain/use-case';
import {
  BuildingRepositoryAbstract,
  LocationRepositoryAbstract,
  LocationTreeRepositoryAbstract,
} from './database/repositories/abstracts';
import {
  BuildingRepositoryImpl,
  LocationRepositoryImpl,
  LocationTreeRepositoryImpl,
} from './database/repositories/implements';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BuildingEntity,
  LocationEntity,
  LocationTreeEntity,
} from './database/entities';
import { CommonModule } from '../common/common-module';
import { LocationController } from './api/http/controllers';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([
      BuildingEntity,
      LocationEntity,
      LocationTreeEntity,
    ]),
  ],
  controllers: [LocationController],
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
    {
      provide: BuildingRepositoryAbstract,
      useClass: BuildingRepositoryImpl,
    },
    {
      provide: LocationTreeRepositoryAbstract,
      useClass: LocationTreeRepositoryImpl,
    },
  ],
})
export class LocationModule {}
