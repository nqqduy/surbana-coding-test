export abstract class BaseModel<Entity> {
  public abstract toEntity(): Entity;
}
