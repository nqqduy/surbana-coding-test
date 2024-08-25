import { LocationRepositoryAbstract } from '../abstracts';
import { LocationEntity } from '../../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class LocationRepositoryImpl extends LocationRepositoryAbstract {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {
    super();
  }
  async create(data: LocationEntity): Promise<LocationEntity> {
    return await this.locationRepository.save(data);
  }
  async delete(locationId: number): Promise<void> {}
  async update(locationId: number, data: LocationEntity): Promise<void> {}

  async findOneByCode(code: string): Promise<LocationEntity> {
    return await this.locationRepository.findOne({
      where: { code },
    });
  }

  async findOneById(id: number): Promise<LocationEntity> {
    return await this.locationRepository.findOne({ where: { id } });
  }
}
