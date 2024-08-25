import { BuildingRepositoryAbstract } from '../abstracts';
import { Repository } from 'typeorm';
import { BuildingEntity } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';

export class BuildingRepositoryImpl extends BuildingRepositoryAbstract {
  constructor(
    @InjectRepository(BuildingEntity)
    private readonly buildingRepository: Repository<BuildingEntity>,
  ) {
    super();
  }

  async findOneById(id: number): Promise<BuildingEntity> {
    try {
      Logger.log(`Find one building with id: ${id}`, 'BuildingRepository');

      return await this.buildingRepository.findOne({
        where: { id },
      });
    } catch (error) {
      Logger.error(
        `Failed to find one building with id: ${id}`,
        error.stack,
        'BuildingRepository',
      );

      throw error;
    }
  }
}
