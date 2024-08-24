import { LocationModel } from 'src/modules/locations/domain/models';

export abstract class LocationRepositoryAbstract {
  abstract create(data: LocationModel): Promise<void>;
  abstract update(locationId: number, data: LocationModel): Promise<void>;
  abstract delete(locationId: number): Promise<void>;
}
