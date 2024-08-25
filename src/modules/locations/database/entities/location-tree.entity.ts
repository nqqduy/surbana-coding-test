import { BaseTimestampEntity } from 'src/common/database';
import { DATABASE_NAME } from 'src/common/database/database-name';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity(DATABASE_NAME.LOCATION_TREE)
export class LocationTreeEntity extends BaseTimestampEntity {
  @PrimaryColumn({ name: 'ancestor_id' })
  ancestorId: number;

  @PrimaryColumn({ name: 'descendant_id' })
  descendantId: number;

  @Column({ name: 'name' })
  name: string;
}
