import { Injectable, Logger } from '@nestjs/common';
import {
  BuildingRepositoryAbstract,
  LocationRepositoryAbstract,
  LocationTreeRepositoryAbstract,
} from '../../database/repositories/abstracts';
import { ErrorException } from 'src/config/exception';
import { BUILDING_ERROR_CODE, LOCATION_ERROR_CODE } from '../enum';
import { LocationEntity } from '../../database/entities';

interface IInput {
  locationId: number;
  buildingId?: number;
  ancestorId?: number;
  name?: string;
  number?: string;
  area?: number;
}

@Injectable()
export class UpdateLocationUseCase {
  constructor(
    private readonly locationRepositoryAbstract: LocationRepositoryAbstract,
    private readonly buildingRepositoryAbstract: BuildingRepositoryAbstract,
    private readonly locationTreeRepositoryAbstract: LocationTreeRepositoryAbstract,
  ) {}

  async execute(data: IInput) {
    Logger.log(
      'Update location use case execute: ' + JSON.stringify(data),
      'UpdateLocationUseCase',
    );

    const locationEntity = await this.locationRepositoryAbstract.findOneById(
      data.locationId,
    );
    if (!locationEntity) {
      throw new ErrorException(
        LOCATION_ERROR_CODE.LOCATION_NOT_FOUND,
        'Location not found',
      );
    }

    const isCheckUniqueLocationCode =
      data.number && data.number !== locationEntity.code;
    if (isCheckUniqueLocationCode) {
      await this.checkUniqueLocationCode(data.number);
    }

    if (data.buildingId) {
      await this.checkExistBuilding(data.buildingId);
    }

    await this.updateLocation(data);
  }

  async updateLocation(data: IInput) {
    const updateLocationData = new LocationEntity();

    updateLocationData.updatedAt = new Date();

    if (data.name) updateLocationData.name = data.name;
    if (data.number) updateLocationData.code = data.number;
    if (data.area) updateLocationData.area = data.area;
    if (data.buildingId) updateLocationData.buildingId = data.buildingId;

    await this.locationRepositoryAbstract.update(
      data.locationId,
      updateLocationData,
    );
  }

  async checkUniqueLocationCode(locationCode: string) {
    const locationEntity =
      await this.locationRepositoryAbstract.findOneByCode(locationCode);
    if (locationEntity) {
      Logger.error(
        `Failed to checkUniqueLocationCode : ${locationCode}`,
        'UpdateLocationUseCase',
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
        'UpdateLocationUseCase',
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
        'UpdateLocationUseCase',
      );
      throw new ErrorException(
        BUILDING_ERROR_CODE.BUILDING_NOT_FOUND,
        'Building not found',
      );
    }
  }
}
