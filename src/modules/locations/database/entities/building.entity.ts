import { BaseTimestampEntity } from 'src/common/database';
import { Column, PrimaryColumn } from 'typeorm';
import { BuildingModel } from '../../domain/models';

export class BuildingEntity extends BaseTimestampEntity<BuildingModel> {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  public toModel(): BuildingModel {
    return BuildingModel.toModel(this);
  }
}
