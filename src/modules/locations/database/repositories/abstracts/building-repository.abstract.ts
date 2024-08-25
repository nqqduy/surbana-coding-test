import { BuildingEntity } from '../../entities';

export abstract class BuildingRepositoryAbstract {
  abstract findOneById(id: number): Promise<BuildingEntity>;
}
