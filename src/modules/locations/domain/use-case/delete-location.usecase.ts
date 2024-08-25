import { Injectable, Logger } from '@nestjs/common';
import { LocationRepositoryAbstract } from '../../database/repositories/abstracts';
import { LOCATION_ERROR_CODE } from '../enum';
import { ErrorException } from 'src/config/exception';

@Injectable()
export class DeleteLocationUseCase {
  constructor(
    private readonly locationRepositoryAbstract: LocationRepositoryAbstract,
  ) {}

  async execute(locationId: number) {
    Logger.log(
      'Delete location use case execute: ' + locationId,
      'DeleteLocationUseCase',
    );

    await this.checkExistLocation(locationId);
    await this.locationRepositoryAbstract.delete(locationId);
  }

  async checkExistLocation(locationId: number) {
    const locationEntity =
      await this.locationRepositoryAbstract.findOneById(locationId);
    if (!locationEntity) {
      Logger.error(
        `Failed to checkExistLocation : ${locationId}`,
        'DeleteLocationUseCase',
      );
      throw new ErrorException(
        LOCATION_ERROR_CODE.LOCATION_NOT_FOUND,
        'Location not found',
      );
    }
  }
}
