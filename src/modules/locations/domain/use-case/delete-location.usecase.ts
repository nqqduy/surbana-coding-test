import { Injectable } from '@nestjs/common';
import { LocationRepositoryAbstract } from '../../database/repositories/abstracts';

@Injectable()
export class DeleteLocationUseCase {
  constructor(
    private readonly locationRepositoryAbstract: LocationRepositoryAbstract,
  ) {}
  async execute(locationId: number) {
    this.locationRepositoryAbstract.delete(locationId);
  }
}
