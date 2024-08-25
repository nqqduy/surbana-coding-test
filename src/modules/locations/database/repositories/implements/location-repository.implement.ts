import { LocationRepositoryAbstract } from '../abstracts';
import { LocationEntity } from '../../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';

export class LocationRepositoryImpl extends LocationRepositoryAbstract {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {
    super();
  }
  async create(data: LocationEntity): Promise<LocationEntity> {
    try {
      Logger.log(
        `Create location with data: ${JSON.stringify(data)}`,
        'LocationRepository',
      );
      return await this.locationRepository.save(data);
    } catch (error) {
      Logger.error(
        `Failed to create location with data: ${JSON.stringify(data)}`,
        error.stack,
        'LocationRepository',
      );
      throw error;
    }
  }

  async delete(locationId: number): Promise<void> {
    try {
      Logger.log(
        `Delete location with locationId: ${locationId}`,
        'LocationRepository',
      );
      await this.locationRepository.delete(locationId);
    } catch (error) {
      Logger.error(
        `Failed to delete location with locationId: ${locationId}`,
        error.stack,
        'LocationRepository',
      );
      throw error;
    }
  }

  async update(locationId: number, data: LocationEntity): Promise<void> {
    try {
      Logger.log(
        `Update location with locationId: ${locationId} and data: ${JSON.stringify(data)}`,
        'LocationRepository',
      );
      await this.locationRepository.update({ id: locationId }, data);
    } catch (error) {
      Logger.error(
        `Failed to update location with locationId: ${locationId} and data: ${JSON.stringify(data)}`,
        error.stack,
        'LocationRepository',
      );
      throw error;
    }
  }

  async findOneByCode(code: string): Promise<LocationEntity> {
    try {
      Logger.log(`Find one location with code: ${code}`, 'LocationRepository');
      return await this.locationRepository.findOne({
        where: { code },
      });
    } catch (error) {
      Logger.error(
        `Failed to find one location with code: ${code}`,
        error.stack,
        'LocationRepository',
      );
      throw error;
    }
  }

  async findOneById(id: number): Promise<LocationEntity> {
    try {
      Logger.log(`Find one location with id: ${id}`, 'LocationRepository');
      return await this.locationRepository.findOne({ where: { id } });
    } catch (error) {
      Logger.error(
        `Failed to find one location with id: ${id}`,
        error.stack,
        'LocationRepository',
      );
      throw error;
    }
  }
}
