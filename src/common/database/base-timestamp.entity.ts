import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity<Model> {
  public abstract toModel(): Model;
}
export abstract class BaseTimestampEntity<Model> extends BaseEntity<Model> {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // @Column()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
