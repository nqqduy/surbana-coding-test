import { BaseTimestampEntity } from 'src/common/database';
import { DATABASE_NAME } from 'src/common/database/database-name';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(DATABASE_NAME.BUILDING)
export class BuildingEntity extends BaseTimestampEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;
}
