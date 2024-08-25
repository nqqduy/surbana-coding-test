export abstract class LocationTreeRepositoryAbstract {
  abstract create(ancestorId: number, newLocationId: number): Promise<void>;
}
