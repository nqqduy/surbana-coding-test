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

  async moveTree(locationId: number, newAncestorId: number): Promise<void> {
    try {
      Logger.log(
        `Move location ${locationId} to ${newAncestorId} node`,
        'LocationTreeRepository',
      );

      await this.locationTreeRepository.query(`
        DELETE FROM ${DATABASE_NAME.LOCATION_TREE}
        WHERE ancestor_id IN (SELECT ancestor_id FROM ${DATABASE_NAME.LOCATION_TREE} WHERE ancestor_id != descendant_id AND descendant_id = ${locationId})
        AND 
        descendant_id IN (SELECT descendant_id FROM ${DATABASE_NAME.LOCATION_TREE} WHERE ancestor_id = ${locationId})
      `);

      await this.locationTreeRepository.query(`
        INSERT INTO ${DATABASE_NAME.LOCATION_TREE} (ancestor_id, descendant_id)
        SELECT superTree.ancestor_id, subtree.descendant_id FROM ${DATABASE_NAME.LOCATION_TREE} AS superTree
            CROSS JOIN ${DATABASE_NAME.LOCATION_TREE} AS subtree
        WHERE superTree.descendant_id = ${newAncestorId} AND subtree.ancestor_id = ${locationId};
      `);
    } catch (error) {
      Logger.error(
        `Failed Move location ${locationId} to ${newAncestorId} node`,
        error.stack,
        'LocationTreeRepository',
      );
      throw error;
    }
  }
}
