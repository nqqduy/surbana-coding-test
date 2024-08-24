import { BaseModel } from 'src/common/models';
import { BuildingEntity, LocationEntity } from '../../database/entities';

export class LocationModel extends BaseModel<LocationEntity> {
  private id: number;
  private name: string;
  private number: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  private constructor() {
    super();
  }

  public toEntity(): LocationEntity {
    const locationEntity = new LocationEntity();

    locationEntity.id = this.id;
    locationEntity.name = this.name;
    locationEntity.number = this.number;
    locationEntity.createdAt = this.createdAt;
    locationEntity.updatedAt = this.updatedAt;
    locationEntity.deletedAt = this.deletedAt;

    return locationEntity;
  }

  public static toModel(data: LocationEntity): LocationModel {
    const locationModel = new LocationModel();

    locationModel.id = data.id;
    locationModel.name = data.name;
    locationModel.number = data.number;
    locationModel.createdAt = data.createdAt;
    locationModel.updatedAt = data.updatedAt;
    locationModel.deletedAt = data.deletedAt;

    return locationModel;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getNumber(): string {
    return this.number;
  }

  public setNumber(number: string): void {
    this.number = number;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  public getDeletedAt(): Date {
    return this.deletedAt;
  }

  public setDeletedAt(deletedAt: Date): void {
    this.deletedAt = deletedAt;
  }
}
