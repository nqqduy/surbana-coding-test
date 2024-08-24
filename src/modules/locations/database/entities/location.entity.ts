import { BaseTimestampEntity } from 'src/common/database';
import { Column, PrimaryColumn } from 'typeorm';
import { BuildingModel, LocationModel } from '../../domain/models';

export class LocationEntity extends BaseTimestampEntity<LocationModel> {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'number' })
  number: string;

  public toModel(): LocationModel {
    return LocationModel.toModel(this);
  }
}
