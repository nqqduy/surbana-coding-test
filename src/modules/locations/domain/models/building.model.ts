import { BuildingEntity } from '../../database/entities/building.entity';
import { BaseModel } from 'src/common/models';

export class BuildingModel extends BaseModel<BuildingEntity> {
  private id: number;
  private name: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  private constructor() {
    super();
  }

  public toEntity(): BuildingEntity {
    const buildingEntity = new BuildingEntity();

    buildingEntity.id = this.id;
    buildingEntity.name = this.name;
    buildingEntity.createdAt = this.createdAt;
    buildingEntity.updatedAt = this.updatedAt;
    buildingEntity.deletedAt = this.deletedAt;

    return buildingEntity;
  }

  public static toModel(data: BuildingEntity): BuildingModel {
    const buildingModel = new BuildingModel();

    buildingModel.id = data.id;
    buildingModel.name = data.name;
    buildingModel.createdAt = data.createdAt;
    buildingModel.updatedAt = data.updatedAt;
    buildingModel.deletedAt = data.deletedAt;

    return buildingModel;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
    return this;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
    return this;
  }

  public getDeletedAt(): Date {
    return this.deletedAt;
  }

  public setDeletedAt(deletedAt: Date) {
    this.deletedAt = deletedAt;
    return this;
  }
}
