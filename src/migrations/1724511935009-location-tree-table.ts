import { DATABASE_NAME } from 'src/common/database/database-name';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class LocationTreeTable1724511935009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DATABASE_NAME.LOCATION_TREE,
        columns: [
          {
            name: 'ancestor_id',
            type: 'bigint',
            unsigned: true,
            isNullable: false,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'descendant_id',
            type: 'bigint',
            unsigned: true,
            isNullable: false,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      DATABASE_NAME.LOCATION_TREE,
      new TableForeignKey({
        columnNames: ['ancestor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: DATABASE_NAME.LOCATION,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      DATABASE_NAME.LOCATION_TREE,
      new TableForeignKey({
        columnNames: ['descendant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: DATABASE_NAME.LOCATION,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DATABASE_NAME.LOCATION_TREE);
  }
}
