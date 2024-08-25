import { DATABASE_NAME } from 'src/common/database/database-name';
import { BuildingEntity } from 'src/modules/locations/database/entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertSampleValueBuilding1724507520027
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO ${DATABASE_NAME.BUILDING} (name) VALUES ('A'), ('B')
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
