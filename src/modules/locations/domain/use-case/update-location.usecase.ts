import { Injectable } from '@nestjs/common';
import { LocationRepositoryAbstract } from '../../database/repositories/abstracts';

interface IInput {
  locationId: number;
}

@Injectable()
export class UpdateLocationUseCase {
  constructor(
    private readonly locationRepositoryAbstract: LocationRepositoryAbstract,
  ) {}

  async execute(data: IInput) {
    // this.locationRepositoryAbstract.update();
  }
}
