import { Injectable } from '@nestjs/common';
import { LocationRepositoryAbstract } from '../../database/repositories/abstracts';

interface IInput {}

@Injectable()
export class CreateLocationUseCase {
  constructor(
    private readonly locationRepositoryAbstract: LocationRepositoryAbstract,
  ) {}
  async execute(data: IInput) {
    this.locationRepositoryAbstract.create();
  }
}
