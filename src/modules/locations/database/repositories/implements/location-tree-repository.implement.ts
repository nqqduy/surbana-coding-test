import { LocationTreeRepositoryAbstract } from '../abstracts';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationTreeEntity } from '../../entities/location-tree.entity';
import { DATABASE_NAME } from 'src/common/database/database-name';
import { Logger } from '@nestjs/common';

export class LocationTreeRepositoryImpl extends LocationTreeRepositoryAbstract {
  constructor(
    @InjectRepository(LocationTreeEntity)
    private readonly locationTreeRepository: Repository<LocationTreeEntity>,
  ) {
    super();
  }

  async create(ancestorId: number, newLocationId: number): Promise<void> {
    try {
      Logger.log(
        `Create location tree with ancestorId: ${ancestorId} and newLocationId: ${newLocationId}`,
        'LocationTreeRepository',
      );

      await this.locationTreeRepository.query(`
              INSERT INTO ${DATABASE_NAME.LOCATION_TREE} (ancestor_id, descendant_id)
              SELECT t.ancestor_id, ${newLocationId}
              FROM ${DATABASE_NAME.LOCATION_TREE} AS t
              WHERE t.descendant_id = ${ancestorId}
              UNION ALL
              SELECT ${newLocationId}, ${newLocationId};
            `);
    } catch (error) {
      Logger.error(
        `Failed to Create location  with ancestorId: ${ancestorId} and newLocationId: ${newLocationId}`,
        error.stack,
        'LocationTreeRepository',
      );
      throw error;
    }
  }
}
