import { DATABASE_NAME } from 'src/common/database/database-name';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateLocationTable1724511105158 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DATABASE_NAME.LOCATION,
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'code',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'area',
            type: 'double precision',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },

          {
            name: 'building_id',
            type: 'bigint',
            unsigned: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      DATABASE_NAME.LOCATION,
      new TableForeignKey({
        columnNames: ['building_id'],
        referencedColumnNames: ['id'],
        referencedTableName: DATABASE_NAME.BUILDING,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase(DATABASE_NAME.LOCATION);
  }
}
