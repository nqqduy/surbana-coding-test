import { LocationEntity } from '../../entities';

export abstract class LocationRepositoryAbstract {
  abstract create(data: LocationEntity): Promise<LocationEntity>;
  abstract update(locationId: number, data: LocationEntity): Promise<void>;
  abstract delete(locationId: number): Promise<void>;
  abstract findOneByCode(locationCode: string): Promise<LocationEntity>;
  abstract findOneById(locationId: number): Promise<LocationEntity>;
}
