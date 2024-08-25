export abstract class LocationTreeRepositoryAbstract {
  abstract create(ancestorId: number, newLocationId: number): Promise<void>;

  /**
   *
   * @param locationId location needs to be moved
   * @param newAncestorId location will move to this node
   */
  abstract moveTree(locationId: number, newAncestorId: number): Promise<void>;
}
