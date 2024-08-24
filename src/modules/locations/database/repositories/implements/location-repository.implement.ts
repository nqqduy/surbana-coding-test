import { LocationModel } from 'src/modules/locations/domain/models';
import { LocationRepositoryAbstract } from '../abstracts';

export class LocationRepositoryImpl extends LocationRepositoryAbstract {
  async create(data: LocationModel): Promise<void> {}
  async delete(locationId: number): Promise<void> {}
  async update(locationId: number, data: LocationModel): Promise<void> {}
}
