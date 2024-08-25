import { BuildingRepositoryAbstract } from '../abstracts';
import { Repository } from 'typeorm';
import { BuildingEntity } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';

export class BuildingRepositoryImpl extends BuildingRepositoryAbstract {
  constructor(
    @InjectRepository(BuildingEntity)
    private readonly buildingRepository: Repository<BuildingEntity>,
  ) {
    super();
  }

  findOneById(id: number): Promise<BuildingEntity> {
    return this.buildingRepository.findOne({
      where: { id },
    });
  }
}
