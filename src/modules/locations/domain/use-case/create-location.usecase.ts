import { Injectable, Logger } from '@nestjs/common';
import {
  BuildingRepositoryAbstract,
  LocationRepositoryAbstract,
  LocationTreeRepositoryAbstract,
} from '../../database/repositories/abstracts';
import { ErrorException } from 'src/config/exception';
import { LocationEntity } from '../../database/entities';
import { BUILDING_ERROR_CODE, LOCATION_ERROR_CODE } from '../enum';
import { Transactional } from 'typeorm-transactional';

interface IInput {
  buildingId: number;
  ancestorId?: number;
  name: string;
  number: string;
  area: number;
}

@Injectable()
export class CreateLocationUseCase {
  constructor(
    private readonly locationRepositoryAbstract: LocationRepositoryAbstract,
    private readonly buildingRepositoryAbstract: BuildingRepositoryAbstract,
    private readonly locationTreeRepositoryAbstract: LocationTreeRepositoryAbstract,
  ) {}

  @Transactional()
  async execute(data: IInput) {
    Logger.log(
      'Create location use case execute: ' + JSON.stringify(data),
      'CreateLocationUseCase',
    );

    await this.checkExistBuilding(data.buildingId);
    await this.checkUniqueLocationCode(data.number);
    if (data.ancestorId) {
      await this.checkExistAncestorLocation(data.ancestorId);
    }
    const newLocation = await this.createLocation(data);

    // INSERT LOCATION INTO LOCATION TREE WHEN ancestorId = 0 (root) ancestorId # 0 (node)
    if (data.ancestorId !== undefined) {
      await this.insertLocationIntoLocationTree(
        data.ancestorId,
        newLocation.id,
      );
    }
  }

  async createLocation(data: IInput): Promise<LocationEntity> {
    const creationLocationData = new LocationEntity();

    creationLocationData.name = data.name;
    creationLocationData.code = data.number;
    creationLocationData.area = data.area;
    creationLocationData.buildingId = data.buildingId;
    creationLocationData.createdAt = new Date();
    creationLocationData.updatedAt = new Date();

    return await this.locationRepositoryAbstract.create(creationLocationData);
  }

  async insertLocationIntoLocationTree(
    ancestorId: number,
    newLocationId: number,
  ): Promise<void> {
    await this.locationTreeRepositoryAbstract.create(ancestorId, newLocationId);
  }

  async checkUniqueLocationCode(locationCode: string) {
    const locationEntity =
      await this.locationRepositoryAbstract.findOneByCode(locationCode);
    if (locationEntity) {
      Logger.error(
        `Failed to checkUniqueLocationCode : ${locationCode}`,
        'CreateLocationUseCase',
      );
      throw new ErrorException(
        LOCATION_ERROR_CODE.LOCATION_ALREADY_EXIST,
        'Location already exist',
      );
    }
  }

  async checkExistAncestorLocation(locationId: number) {
    const locationEntity =
      await this.locationRepositoryAbstract.findOneById(locationId);
    if (!locationEntity) {
      Logger.error(
        `Failed to checkExistAncestorLocation : ${locationId}`,
        'CreateLocationUseCase',
      );
      throw new ErrorException(
        LOCATION_ERROR_CODE.ANCESTOR_LOCATION_NOT_FOUND,
        'Ancestor location not found',
      );
    }
  }

  async checkExistBuilding(buildingId: number) {
    const buildingEntity =
      await this.buildingRepositoryAbstract.findOneById(buildingId);
    if (!buildingEntity) {
      Logger.error(
        `Failed to checkExistBuilding : ${buildingId}`,
        'CreateLocationUseCase',
      );
      throw new ErrorException(
        BUILDING_ERROR_CODE.BUILDING_NOT_FOUND,
        'Building not found',
      );
    }
  }
}
